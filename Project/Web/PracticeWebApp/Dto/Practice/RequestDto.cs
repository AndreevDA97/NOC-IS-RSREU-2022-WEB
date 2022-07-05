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
	public class RequestDto
	{
		public int Id { get; set; }
        public string AccountId { get; set; }
        public int? ExecutorId { get; set; }
        public int? FailureId { get; set; }
        public DateTime IncomingDate { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public bool? Executed { get; set; }

        //дополнительные поля
        public string ExecutorFio { get; set; }
        public string FailureNM { get; set; }
        public string ExecutionDateText { get; set; }


        public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new RequestDto
			{
				Id = itemOrm.REQUESTCD,
				AccountId = itemOrm.ACCOUNTCD,
				ExecutorId = itemOrm.EXECUTORCD,
				FailureId = itemOrm.FAILURECD,
				IncomingDate = itemOrm.INCOMINGDATE,
				ExecutionDate = itemOrm.EXECUTIONDATE,
				Executed = ExecutedValue(itemOrm.EXECUTED),
				ExecutorFio = itemOrm.EXECUTOR?.Fio ?? "-",
				FailureNM = itemOrm.DISREPAIR?.FAILURENM ?? "-",
				ExecutionDateText = itemOrm.EXECUTIONDATE?.ToShortDateString() ?? "-"
			};
			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AccountId;
			itemOrm.EXECUTORCD = ExecutorId;
			itemOrm.FAILURECD = FailureId;
			itemOrm.INCOMINGDATE = IncomingDate;
			itemOrm.EXECUTIONDATE = ExecutionDate;
			itemOrm.EXECUTED = Convert.ToInt16(Executed);
			return itemOrm;
		}

		//private static string GetExecutedText(short? value)
  //      {
		//	if (value is short v)
  //          {
		//		return v == 1 ? "Выполнено" : "Не выполнено";
  //          }
		//	return "-";
  //      }

		private static bool? ExecutedValue(short? value)
        {
			if (value is short v)
            {
				return (v == 1) ? true : false;
            }
			return null;
        }

		public string IsValidate()
        {
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(AccountId))
			{
				errorMessage = "Не задано ФИО!";
				return errorMessage;
			}
            if (IncomingDate == default(DateTime))
            {
                errorMessage = "Не задана дата поступления заявки!";
                return errorMessage;
            }
            return errorMessage;
		}
	}
}