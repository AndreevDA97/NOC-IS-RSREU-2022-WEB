﻿using PaySystemServer.DataBaseCommon;
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
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Controllers.Practice
{
    [RoutePrefix("api/Practice")]
    public class ExecutorListController : ApiController
    {
        [HttpPost]
        [Route("ExecutorList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var values = db.EXECUTOR
                    .Select(s => new
                    {
                        Id = s.EXECUTORCD,
                        Name = s.Fio
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}