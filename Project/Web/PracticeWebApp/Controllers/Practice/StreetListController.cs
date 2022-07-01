using AbonentPlus.PaySystem.Server.PaySystemORM;
using AbonentPlus.PaySystem.Utils;
using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PaySystemWebCommon.Dto.Common;
using PaySystemWebCommon.Helpers.Common;
using PracticeWebApp.Dto.Practice;
using PracticeWebApp.Helpers.Practice;
using PracticeWebApp.Models.Practice;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace PracticeWebApp.Controllers.Practice
{
    [RoutePrefix("api/Practice")]
    public class StreetListController : ApiController
    {
        [HttpPost]
        [Route("StreetList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var values = db.STREET
                    .Select(s => new
                    {
                        Id = s.STREETCD,
                        Name = s.STREETNM
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}