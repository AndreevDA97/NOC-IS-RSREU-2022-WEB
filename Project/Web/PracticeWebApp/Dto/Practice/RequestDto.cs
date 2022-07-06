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
		public string AbonentFIO { get; set; }
		public int? ExecutorId { get; set; }
		public string ExecutorFio { get; set; }
		public int? FailureId { get; set; }
		public string FailureName { get; set; }

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
				AbonentFIO = itemOrm.ABONENT.Fio,
				ExecutorId = itemOrm.EXECUTORCD,
				FailureId = itemOrm.FAILURECD,
				IncomingDate = itemOrm.INCOMINGDATE,
				ExecutionDate = itemOrm.EXECUTIONDATE,
				Executed = (itemOrm.EXECUTED > 0 ? true : false)
			};

			if (!(itemOrm.EXECUTOR is null))
				result.ExecutorFio = itemOrm.EXECUTOR.Fio;

			if (!(itemOrm.DISREPAIR is null))
				result.FailureName = itemOrm.DISREPAIR.FAILURENM;

			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AbonentId;
			itemOrm.EXECUTORCD = ExecutorId;
			itemOrm.FAILURECD = FailureId;
			itemOrm.INCOMINGDATE = IncomingDate.Value.Date;
			itemOrm.EXECUTIONDATE = ExecutionDate.Value.Date;
			itemOrm.EXECUTED = Executed == true ? (short)1 : (short)0;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (IncomingDate.HasValue)
			{
				errorMessage = "Не задана дата принятия заявки!";
				return errorMessage;
			}
			if (/*string.IsNullOrEmpty(ExecutionDate)*/ExecutionDate.HasValue)
			{
				errorMessage = "Не задана дата исполнения заявки!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}