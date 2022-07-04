using AbonentPlus.PaySystem.Server.PaySystemORM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeWebApp.Dto.Practice
{
    public class RequestDto
    {
        public int Id { get; set; }
        public string AccountId { get; set; }
        public int? ExecutorId { get; set; }
        public int? FailrueId { get; set; }
        public DateTime IncommingDate { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public bool Executed { get; set; }

		public static RequestDto Map(REQUEST itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new RequestDto
			{
				Id = itemOrm.REQUESTCD,
				AccountId = itemOrm.ACCOUNTCD,
				ExecutorId = itemOrm.EXECUTORCD,
				FailrueId = itemOrm.FAILURECD,
				IncommingDate = itemOrm.INCOMINGDATE,
				ExecutionDate = itemOrm.EXECUTIONDATE,
				Executed = Convert.ToBoolean(itemOrm.EXECUTED)
			};
			return result;
		}

		public REQUEST ToOrm(REQUEST itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new REQUEST();
			itemOrm.REQUESTCD = Id;
			itemOrm.ACCOUNTCD = AccountId;
			itemOrm.EXECUTORCD = ExecutorId;
			itemOrm.FAILURECD = FailrueId;
			itemOrm.INCOMINGDATE = IncommingDate;
			itemOrm.EXECUTIONDATE = ExecutionDate;
			itemOrm.EXECUTED = Convert.ToInt16(Executed);
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(AccountId))
			{
				errorMessage = "Не выбран клиент!";
				return errorMessage;
			}
			if (IncommingDate == DateTime.MinValue)
			{
				errorMessage = "Не указано время принятия заявки!";
				return errorMessage;
			}
			if (IncommingDate > ExecutionDate)
			{
				errorMessage = "Исправление не может произойти до поступлния заявки!";
				return errorMessage;
			}
			return errorMessage;
		}
	}

}