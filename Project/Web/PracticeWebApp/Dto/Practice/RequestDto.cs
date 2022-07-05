using AbonentPlus.PaySystem.Server.PaySystemORM;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using PaySystemWebCommon.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Globalization;

namespace PracticeWebApp.Dto.Practice
{
	/// <summary>
	/// Заявка
	/// </summary>
    public class RequestDto
    {
		public int Id { get; set; }
		public string AbonentId { get; set; }
		public string ExecutorId { get; set; }
		public string FailureId { get; set; }
        public string IncomingDate { get; set; }
        public string ExecutionDate { get; set; }
        public string Executed { get; set; }

        public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new RequestDto
			{
				Id = itemOrm.REQUESTCD,
				AbonentId = itemOrm.ACCOUNTCD.ToString(),
				ExecutorId = itemOrm.EXECUTORCD.ToString(),
				FailureId = itemOrm.FAILURECD.ToString(),
				IncomingDate = itemOrm.INCOMINGDATE.Date.ToShortDateString(),
				ExecutionDate = itemOrm.INCOMINGDATE.Date.ToShortDateString(),
				Executed = itemOrm.EXECUTED.ToString()
			};
			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AbonentId;
			itemOrm.EXECUTORCD = int.Parse(ExecutorId);
			itemOrm.FAILURECD = int.Parse(FailureId);
			itemOrm.INCOMINGDATE = DateTime.Parse(IncomingDate, CultureInfo.GetCultureInfo("ru"));
			itemOrm.EXECUTIONDATE = DateTime.Parse(ExecutionDate, CultureInfo.GetCultureInfo("ru"));
			itemOrm.EXECUTED = Int16.Parse(Executed);
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrEmpty(IncomingDate))
			{
				errorMessage = "Не задана дата принятия заявки!";
				return errorMessage;
			}
			if (string.IsNullOrEmpty(ExecutionDate))
			{
				errorMessage = "Не задана дата исполнения заявки!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}