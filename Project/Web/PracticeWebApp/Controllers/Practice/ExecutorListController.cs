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
        /// <summary>
        /// Получение списка исполнителей
        /// </summary>
        /// <returns></returns>
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
                    .OrderByDescending(e => e.EXECUTORCD)
                    .Select(e => new
                    {
                        Id = e.EXECUTORCD,
                        Fio = e.Fio
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}