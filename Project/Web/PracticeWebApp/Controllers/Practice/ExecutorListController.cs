using AbonentPlus.PaySystem.Server.PaySystemORM;
using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PracticeWebApp.Dto.Practice;
using PracticeWebApp.Helpers.Practice;
using PracticeWebApp.Models.Practice;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                var model = new GetExecutorListModel();
                var query = model.GetQuery(db);
                var values = query
                    .OrderByDescending(a => a.EXECUTORCD)
                    .Select(a => new
                    { 
                        Id = a.EXECUTORCD,
                        Fio = a.Fio
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}