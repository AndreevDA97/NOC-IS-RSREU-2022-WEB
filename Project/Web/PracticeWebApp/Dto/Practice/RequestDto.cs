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
		public string AccountCD { get; set; }
		public int? ExecutorCD { get; set; }
		public int? FailureCD { get; set; }
		public DateTime IncomingDate { get; set; }
		public DateTime? ExecutionDate { get; set; }
		//public short? Executed { get; set; }
		public bool? Executed { get; set; }

		public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new RequestDto
			{
				Id = itemOrm.REQUESTCD,
				AccountCD = itemOrm.ACCOUNTCD,
				ExecutorCD = itemOrm.EXECUTORCD,
				FailureCD = itemOrm.FAILURECD,
				IncomingDate = itemOrm.INCOMINGDATE,
				ExecutionDate = itemOrm.EXECUTIONDATE,
				Executed = itemOrm.EXECUTED==0?false:true
			};
			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AccountCD;
			itemOrm.EXECUTORCD = ExecutorCD;
			itemOrm.FAILURECD = FailureCD;
			itemOrm.INCOMINGDATE = IncomingDate;
			itemOrm.EXECUTIONDATE = ExecutionDate;
			itemOrm.EXECUTED = (short?)(Executed ==false?0:1);
			return itemOrm;
		}

		
	}
}