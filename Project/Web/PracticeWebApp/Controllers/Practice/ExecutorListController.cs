using PaySystemServer.DataBaseCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

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