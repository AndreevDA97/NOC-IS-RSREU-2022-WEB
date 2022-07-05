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
	}
}