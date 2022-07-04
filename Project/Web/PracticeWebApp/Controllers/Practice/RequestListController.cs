using AbonentPlus.PaySystem.Server.PaySystemORM;
using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PracticeWebApp.Dto.Practice;
using PracticeWebApp.Helpers.Practice;
using PracticeWebApp.Models.Practice;
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
    public class RequestListController : ApiController
    {
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
                    var abonentOrm = requestDto.ToOrm(null);
                    db.REQUEST.InsertOnSubmit(abonentOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }

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
    }
}