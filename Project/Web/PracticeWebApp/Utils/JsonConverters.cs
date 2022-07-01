using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace AbonentPlus.PaySystem.Utils.JsonConverters
{
    /// <summary>
    /// Преобразование в формат месяца даты (07.2020)
    /// </summary>
    public class MonthDateConverter : DateTimeConverter
    {
        public override string DateTimeFormat => "MM.yyyy";
    }

    /// <summary>
    /// Преобразование в формат даты и времени (30.07.2020 15:04:20)
    /// </summary>
    public class DateTimeConverter : JsonConverter
    {
        /// <summary>
        /// Определение формата строки даты и времени
        /// </summary>
        public virtual string DateTimeFormat => "dd.MM.yyyy HH:mm:ss";

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            DateTime? datetime = (DateTime?)value;
            if (datetime != null || datetime == new DateTime())
                writer.WriteValue(datetime.Value.ToString(DateTimeFormat));
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var value = (string)reader.Value;
            DateTime.TryParseExact(value, DateTimeFormat, CultureInfo.InvariantCulture,
                DateTimeStyles.None, out var datetime);
            return datetime != new DateTime() ? (DateTime?)datetime : null;
        }
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(DateTime?);
        }
    }

    /// <summary>
    /// Преобразование в логический формат ("True"/"False")
    /// </summary>
    public class BoolConverter : JsonConverter
    {
        /// <summary>
        /// Определение формата строки истинного условия
        /// </summary>
        public virtual string TrueString => bool.TrueString;

        /// <summary>
        /// Определение формата строки ложного условия
        /// </summary>
        public virtual string FalseString => bool.FalseString;

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            bool? boolean = (bool?)value;
            if (boolean != null)
                writer.WriteValue(boolean.Value ? TrueString : FalseString);
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var value = (string)reader.Value;
            if (value == TrueString)
                return true;
            if (value == FalseString)
                return false;
            return null;
        }
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(bool?);
        }
    }

    /// <summary>
    /// Преобразование в денежный формат (1000.00)
    /// </summary>
    public class DecimalConverter : JsonConverter
    {
        /// <summary>
        /// Определение формата строки денежного значения
        /// </summary>
        public virtual string DecimalFormat(string summa)
        {
            return summa.Replace(',', '.');
        }
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            decimal? summa = (decimal?)value;
            if (summa != null)
                writer.WriteValue(DecimalFormat(summa.Value.ToString()));
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var summa = (string)reader.Value;
            decimal.TryParse(DecimalFormat(summa), out var value);
            return value;
        }
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(decimal?);
        }
    }

    /// <summary>
    /// Преобразование в целочисленный формат
    /// </summary>
    public class IntConverter : JsonConverter
    {
        /// <summary>
        /// Определение формата строки целого числа
        /// </summary>
        public virtual string IntFormat(string summa)
        {
            return summa;
        }
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            decimal? integer = (decimal?)value;
            if (integer != null)
                writer.WriteValue(IntFormat(integer.Value.ToString()));
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var integer = (string)reader.Value;
            decimal.TryParse(IntFormat(integer), out var value);
            return value;
        }
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(int?);
        }
    }

    /// <summary>
    /// Преобразование в уникальный идентификатор
    /// </summary>
    public class GuidConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            Guid? guid = (Guid?)value;
            if (guid != null)
                writer.WriteValue(guid.Value.ToString());
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var guid = (string)reader.Value;
            Guid.TryParse(guid, out var value);
            return value;
        }
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(Guid?);
        }
    }

    /// <summary>
    /// TODO: Преобразование в массив определенного типа
    /// </summary>
    public class ArrayCustomJsonConverter<CustomJsonConverter> : JsonConverter
        where CustomJsonConverter : JsonConverter, new()
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
            //var list = (List<string>)value;
            //if (list.Count == 1)
            //    value = list[0];
            //serializer.Serialize(writer, value);
            // TODO: доделать преобразование каждого элемента произвольным конвертером
            // ...
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
            //List<string> strList = null;
            //var token = JToken.Load(reader);
            //strList = token.Type == JTokenType.Array
            //    ? token.ToObject<List<string>>()
            //    : new List<string> { token.ToObject<string>() };
            // TODO: доделать преобразование каждого элемента произвольным конвертером
            // ...
            //return strList
            //    .Select(str => JsonConvert.DeserializeObject<object>(JsonConvert.SerializeObject(str), new CustomJsonConverter()))
            //    .ToArray();
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(List<string>);
        }

        public override bool CanWrite
        {
            get { return true; }
        }
    }
}
