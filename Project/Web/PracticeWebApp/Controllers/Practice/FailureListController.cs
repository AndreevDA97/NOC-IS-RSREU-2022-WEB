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
    public class FailureListController : ApiController
    {
        [HttpPost]
        [Route("FailureList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var model = new GetFailureListModel();
                var query = model.GetQuery(db);
                var values = query
                    .OrderByDescending(a => a.FAILURECD)
                    .Select(a => new
                    { 
                        Id = a.FAILURECD,
                        Name = a.FAILURENM
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}