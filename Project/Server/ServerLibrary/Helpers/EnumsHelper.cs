using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using PaySystemWebCommon.Dto.Common;
using TsSoft.Commons.Collections;

namespace PaySystemWebCommon.Helpers.Common
{
    public static class EnumsHelper
    {
        public static List<IdentifiableNameDto> EnumToIdentifiableList<T>()
        {
            return
                Enums.GetValues<T>()
                    .Select(item => new IdentifiableNameDto
                    {
                        Id = item.Ordinal,
                        Name = Enums.GetEnumDescription(item.Value),
                    })
                    .ToList();
        }

        /// <summary>
        /// Получить атрибут "Описание" (Description)
        /// </summary>
        /// <param name="value">Значение перечисления</param>
        /// <returns>Значение атрибута в строке</returns>
        public static string GetDescription(this Enum value)
        {
            return Enum.IsDefined(value.GetType(), value) ?
                Enums.GetEnumDescription(value) : null;
        }

        /// <summary>
        /// Возвращает атрибут для значения поля enum
        /// </summary>
        /// <typeparam name="T">Тип атрибута для получения</typeparam>
        /// <param name="enumVal">Значение перечисляемого типа</param>
        /// <returns>Атрибут типа T существующий на значении enumVal</returns>
        public static T GetAttribute<T>(this Enum enumVal) where T : Attribute
        {
            var type = enumVal.GetType();
            var memInfo = type.GetMember(enumVal.ToString());
            var attributes = memInfo[0].GetCustomAttributes(typeof(T), false);
            return (attributes.Length > 0) ? (T)attributes[0] : null;
        }

        /// <summary>
        /// Существует ли атрибут "Ограничение" (Obsolete)
        /// </summary>
        /// <param name="value">Значение перечисления</param>
        /// <returns>Значение атрибута в строке</returns>
        public static bool IsObsolete(this Enum value)
        {
            return Enum.IsDefined(value.GetType(), value) ?
                value.GetAttribute<ObsoleteAttribute>() != null : false;
        }
    }
}
