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
	public class AbonentDto
	{
		public string Id { get; set; }
		public int? StreetId { get; set; }
		public string Fio { get; set; }
		public string Phone { get; set; }
		public short? FlatNo { get; set; }
		public short? HouseNo { get; set; }

		public static AbonentDto Map(ABONENT itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new AbonentDto
			{
				Id = itemOrm.ACCOUNTCD,
				StreetId = itemOrm.STREETCD,
				Fio = itemOrm.Fio,
				Phone = itemOrm.PHONE,
				FlatNo = itemOrm.FLATNO,
				HouseNo = itemOrm.HOUSENO
			};
			return result;
		}

		public ABONENT ToOrm(ABONENT itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new ABONENT();
			itemOrm.ACCOUNTCD = Id;
			itemOrm.STREETCD = StreetId;
			itemOrm.Fio = Fio;
			itemOrm.PHONE = Phone;
			itemOrm.FLATNO = FlatNo;
			itemOrm.HOUSENO = HouseNo;
			return itemOrm;
		}

		public string IsValidate()
		{
			string errorMessage = null;
			if (string.IsNullOrWhiteSpace(Fio))
			{
				errorMessage = "Не задано ФИО!";
				return errorMessage;
			}
			if (string.IsNullOrWhiteSpace(Phone))
			{
				errorMessage = "Не задан телефон!";
				return errorMessage;
			}
			return errorMessage;
		}
	}
}