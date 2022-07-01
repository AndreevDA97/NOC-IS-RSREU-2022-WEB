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
    public class AbonentListController : ApiController
    {
        [HttpPost]
        [Route("AbonentList")]
        public GetAbonentListModel Get(GetAbonentListModel model)
        {
            using (var db = DataBase.GetNew())
            {
                // Фильтрация
                var query = model.GetQuery(db);
                // Выполнение запроса
                model.TotalCount = query.Count();
                model.Data = query.Pagination(model)
                    .Select(AbonentDto.Map)
                    .ToList();
            }
            return model;
        }
        [HttpPut]
        [Route("AbonentList/{abonentId}")]
        public HttpResponseMessage Put(int? abonentId, [FromBody]AbonentDto abonentDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);

                if (abonentId.HasValue) // редактирование
                {
                    if (!helper.ValidateById(abonentId, out ABONENT abonentOrm))
                        return result;

                    abonentDto.ToOrm(abonentOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
                else // добавление
                {
                    var errorMessage = abonentDto.IsValidate();
                    if (!string.IsNullOrEmpty(errorMessage))
					{
                        result = Request.CreateResponse(HttpStatusCode.BadRequest, new WebError(errorMessage));
                        return result;
                    }
                    var abonentOrm = abonentDto.ToOrm(null);
                    db.ABONENT.InsertOnSubmit(abonentOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }
        [HttpDelete]
        [Route("AbonentList/{abonentId}")]
        public HttpResponseMessage Delete(int? abonentId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);
                if (!helper.ValidateById(abonentId, out ABONENT abonentOrm))
                    return result;

                db.ABONENT.DeleteOnSubmit(abonentOrm);
                db.SubmitChanges();

                result = Request.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }
        [HttpPost]
        [Route("AbonentList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var model = new GetAbonentListModel();
                var query = model.GetQuery(db);
                var values = query
                    .OrderByDescending(a => a.ACCOUNTCD)
                    .Select(a => new
                    { 
                        Id = a.ACCOUNTCD,
                        Name = a.Fio
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}