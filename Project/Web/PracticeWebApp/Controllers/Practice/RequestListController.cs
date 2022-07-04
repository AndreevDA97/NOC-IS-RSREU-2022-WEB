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
    public class RequestListController : ApiController
    {
        /// <summary>
        /// Получение списка абонентов, отфильтрованных по имени и улице
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("RequestList")]
        public GetRequestListModel Get(GetRequestListModel model)
        {
            using (var db = DataBase.GetNew())
            {
                // Фильтрация
                var query = model.GetQuery(db);
                // Выполнение запроса
                model.TotalCount = query.Count();
                model.Data = query.Pagination(model)
                    .Select(RequestDto.Map)
                    .ToList();
            }
            return model;
        }
        /// <summary>
        /// Редактирование или добавление абонента
        /// </summary>
        /// <param name="requestId"></param>
        /// <param name="requestDto"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("RequestList/{requestId}")]
        public HttpResponseMessage Put(int? requestId, [FromBody] RequestDto requestDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);

                if (requestId.HasValue) // редактирование
                {
                    if (!helper.ValidateById(requestId, out REQUEST requestOrm))
                        return result;

                    requestDto.ToOrm(requestOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
                else // добавление
                {
                    var errorMessage = requestDto.IsValidate();
                    if (!string.IsNullOrEmpty(errorMessage))
                    {
                        result = Request.CreateResponse(HttpStatusCode.BadRequest, new WebError(errorMessage));
                        return result;
                    }
                    var requestOrm = requestDto.ToOrm(null);
                    db.REQUEST.InsertOnSubmit(requestOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }
        /// <summary>
        /// Удаление абонента
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("RequestList/{requestId}")]
        public HttpResponseMessage Delete(int? requestId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);
                if (!helper.ValidateById(requestId, out REQUEST requestOrm))
                    return result;

                db.REQUEST.DeleteOnSubmit(requestOrm);
                db.SubmitChanges();

                result = Request.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }
        /// <summary>
        /// Получение списка абонентов
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("RequestList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var model = new GetRequestListModel();
                var query = model.GetQuery(db);
                var values = query
                    .OrderByDescending(a => a.REQUESTCD)
                    .Select(a => new
                    {
                        Id = a.REQUESTCD,
                        AbonentId = a.ACCOUNTCD,
                        ExecutorId = a.EXECUTORCD,
                        FailureId = a.FAILURECD,
                        IncomingDate = a.INCOMINGDATE,
                        ExecutionDate = a.INCOMINGDATE
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}