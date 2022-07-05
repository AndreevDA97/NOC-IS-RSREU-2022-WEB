using AbonentPlus.PaySystem.Server.PaySystemORM;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using PaySystemWebCommon.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace PracticeWebApp.Dto.Practice
{
    /// <summary>
    /// Исполнитель
    /// </summary>
    public class ExecutorDto
    {
        public int Id { get; set; }
        public string Fio { get; set; }

        public static ExecutorDto Map(EXECUTOR itemOrm)
        {
            if (itemOrm == null) return null;
            var result = new ExecutorDto
            {
                Id = itemOrm.EXECUTORCD,
                Fio = itemOrm.Fio
            };
            return result;
        }

        public EXECUTOR ToOrm(EXECUTOR itemOrm = null)
        {
            if (itemOrm == null) itemOrm = new EXECUTOR();
            itemOrm.EXECUTORCD = Id;
            itemOrm.Fio = Fio;
            return itemOrm;
        }

        public string IsValidate()
        {
            string errorMessage = null;
            if (string.IsNullOrWhiteSpace(Fio))
            {
                errorMessage = "Не задано ФИО!";
                return errorMessage;
            }
            return errorMessage;
        }
    }
}