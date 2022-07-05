using System;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Dto.Practice
{
    /// <summary>
    /// Неисправность
    /// </summary>
    public class FailureDto
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public static FailureDto Map(DISREPAIR itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new FailureDto
			{
				Id = itemOrm.FAILURECD,
				Name = itemOrm.FAILURENM
			};
			return result;
		}

		public DISREPAIR ToOrm(DISREPAIR itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new DISREPAIR();
			itemOrm.FAILURECD = Id;
			itemOrm.FAILURENM = Name;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(Name))
			{
				errorMessage = "Не задано название!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}