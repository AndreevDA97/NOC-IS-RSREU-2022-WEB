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
	public class StreetDto
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public static StreetDto Map(STREET itemOrm)
		{
			if (itemOrm == null) return null;
			var result = new StreetDto
			{
				Id = itemOrm.STREETCD,
				Name = itemOrm.STREETNM
			};
			return result;
		}

		public STREET ToOrm(STREET itemOrm = null)
		{
			if (itemOrm == null) itemOrm = new STREET();
			itemOrm.STREETCD = Id;
			itemOrm.STREETNM = Name;
			return itemOrm;
		}
	}
}