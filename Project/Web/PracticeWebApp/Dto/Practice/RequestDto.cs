using AbonentPlus.PaySystem.Server.PaySystemORM;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using PaySystemWebCommon.Helpers.Common;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PaySystemServer.DataBaseCommon;

namespace PracticeWebApp.Dto.Practice
{
	public class RequestDto
	{
		public int Id { get; set; }
		public string AbonentId { get; set; }
		public string AbonentFio { get; set; }
		public int? ExecutorId { get; set; }
		public string ExecutorFio { get; set; }
		public int? FailureId { get; set; }
		public string FailureName { get; set; }
		public DateTime IncomingDate { get; set; }
		public DateTime? ExecutionDate { get; set; }
		public bool? Executed { get; set; }

		public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			using (var db = DataBase.GetNew())
			{
				var result = new RequestDto
				{
					Id = itemOrm.REQUESTCD,
					AbonentId = itemOrm.ACCOUNTCD,
					AbonentFio = itemOrm.ACCOUNTCD != null
						? db.ABONENT.Where(i => i.ACCOUNTCD == itemOrm.ACCOUNTCD).First().Fio
						: null,
					ExecutorId = itemOrm.EXECUTORCD,
					ExecutorFio = itemOrm.EXECUTORCD != null
						? db.EXECUTOR.Where(i => i.EXECUTORCD == itemOrm.EXECUTORCD).First().Fio
						: null,
					FailureId = itemOrm.FAILURECD,
					FailureName = itemOrm.FAILURECD != null
						? db.DISREPAIR.Where(a => a.FAILURECD == itemOrm.FAILURECD).First().FAILURENM
						: null,
					IncomingDate = itemOrm.INCOMINGDATE,
					ExecutionDate = itemOrm.EXECUTIONDATE,
					Executed = itemOrm.EXECUTED != null ? itemOrm.EXECUTED == 1 : (bool?)null
				};

				return result;
			}
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AbonentId;
			itemOrm.EXECUTORCD = ExecutorId;
			itemOrm.FAILURECD = FailureId;
			itemOrm.INCOMINGDATE = IncomingDate;
			itemOrm.EXECUTIONDATE = ExecutionDate;
			itemOrm.EXECUTED = Executed == null ? (short?)null : Convert.ToInt16(Executed);
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			return errorMessage;
		}
	}
}