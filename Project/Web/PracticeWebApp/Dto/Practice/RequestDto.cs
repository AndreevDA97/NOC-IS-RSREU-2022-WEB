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
	/// Заявка
	/// </summary>
    public class RequestDto
    {
		public int Id { get; set; }
		public string AbonentId { get; set; }
		public int? ExecutorId { get; set; }
		public int? FailureId { get; set; }
        public DateTime? IncomingDate { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public bool? Executed { get; set; }

        public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new RequestDto
			{
				Id = itemOrm.REQUESTCD,
				AbonentId = itemOrm.ACCOUNTCD,
				ExecutorId = itemOrm.EXECUTORCD,
				FailureId = itemOrm.FAILURECD,
				IncomingDate = itemOrm.INCOMINGDATE,
				ExecutionDate = itemOrm.INCOMINGDATE
			};
			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AbonentId;
			itemOrm.EXECUTORCD = ExecutorId;
			itemOrm.FAILURECD = FailureId;
			itemOrm.INCOMINGDATE = IncomingDate ?? DateTime.Now; // What?
			itemOrm.EXECUTIONDATE = ExecutionDate;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (IncomingDate == null)
			{
				errorMessage = "Не задана дата принятия заявки!";
				return errorMessage;
			}
			if (ExecutionDate == null)
			{
				errorMessage = "Не задана дата исполнения заявки!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}