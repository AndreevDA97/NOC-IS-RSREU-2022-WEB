using System;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Dto.Practice
{
    /// <summary>
    /// Исполнитель
    /// </summary>
    public class ExecutorDto
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public static ExecutorDto Map(EXECUTOR itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new ExecutorDto
			{
				Id = itemOrm.EXECUTORCD,
				Name = itemOrm.Fio
			};
			return result;
		}

		public EXECUTOR ToOrm(EXECUTOR itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new EXECUTOR();
			itemOrm.EXECUTORCD = Id;
			itemOrm.Fio = Name;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(Name))
			{
				errorMessage = "Не задано ФИО!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}