using System;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Dto.Practice
{
    /// <summary>
    /// АБонент
    /// </summary>
    public class RequestDto
	{
		public int Id { get; set; }
		public string AccountId { get; set; }
		public int? ExecutorId { get; set; }
		public int? FailureId { get; set; }
		public DateTime IncomingDate { get; set; }
		public DateTime? ExecutionDate { get; set; }
		public short? Executed { get; set; }

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
				Executed = itemOrm.EXECUTED
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
			itemOrm.EXECUTED = Executed;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(AccountId))
			{
				errorMessage = "Не задан лицевой счет!";
				return errorMessage;
			}
			if (IncomingDate.Equals(DateTime.MinValue))
			{
				errorMessage = "Не задана дата!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}