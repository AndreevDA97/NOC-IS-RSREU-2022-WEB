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
        /// Заполняет модель данными на основе её параметров и изменяет её параметры
        /// </summary>
        /// <param name="model">Модель</param>
        /// <returns>Модель с данным и изменёнными парметрами</returns>
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
        /// Обновляет запись абонента на основе входых данных
        /// </summary>
        /// <param name="requestId">Id обновляемого абонента</param>
        /// <param name="requestDto">Данные, на основе которых происхот обновление самой записи</param>
        /// <returns>Http ответ, сообщающий о результате обновления</returns>
        [HttpPut]
        [Route("RequestList/{requestId}")]
        public HttpResponseMessage Put(int? requestId, [FromBody]RequestDto requestDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);

                if (requestId.HasValue) // редактирование
                {
                    if (!helper.ValidateRequestById(requestId, out REQUEST requestOrm))
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
        /// Удаляет абонента по Id
        /// </summary>
        /// <param name="requestId">Id абонента, которого нужно удалить</param>
        /// <returns>Результат удаления</returns>
        [HttpDelete]
        [Route("RequestList/{requestId}")]
        public HttpResponseMessage Delete(int? requestId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);
                if (!helper.ValidateRequestById(requestId, out REQUEST requestOrm))
                    return result;

                db.REQUEST.DeleteOnSubmit(requestOrm);
                db.SubmitChanges();

                result = Request.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }

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
                        Id = a.REQUESTCD
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}