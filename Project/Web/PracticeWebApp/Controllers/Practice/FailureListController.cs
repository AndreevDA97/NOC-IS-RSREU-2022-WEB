using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PracticeWebApp.Dto.Practice;
using PracticeWebApp.Helpers.Practice;
using PracticeWebApp.Models.Practice;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Controllers.Practice
{
    [RoutePrefix("api/Practice")]
    public class FailureListController : ApiController
    {
        /*
        [HttpPost]
        [Route("FailureList")]
        public GetFailureListModel Get(GetFailureListModel model)
        {
            using (var db = DataBase.GetNew())
            {
                // Фильтрация
                var query = model.GetQuery(db);
                // Выполнение запроса
                model.TotalCount = query.Count();
                model.Data = query.Pagination(model)
                    .Select(FailureDto.Map)
                    .ToList();
            }
            return model;
        }
        [HttpPut]
        [Route("FailureList/{failureId}")]
        public HttpResponseMessage Put(int? failureId, [FromBody]FailureDto failureDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new FailureValidateHelper(Failure, ref result, db);

                if (failureId.HasValue) // редактирование
                {
                    if (!helper.ValidateById(failureId, out FAILURE failureOrm))
                        return result;

                    failureDto.ToOrm(failureOrm);
                    db.SubmitChanges();

                    result = Failure.CreateResponse(HttpStatusCode.OK);
                }
                else // добавление
                {
                    var errorMessage = failureDto.IsValidate();
                    if (!string.IsNullOrEmpty(errorMessage))
					{
                        result = Failure.CreateResponse(HttpStatusCode.BadFailure, new WebError(errorMessage));
                        return result;
                    }
                    var failureOrm = failureDto.ToOrm(null);
                    db.FAILURE.InsertOnSubmit(failureOrm);
                    db.SubmitChanges();

                    result = Failure.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }
        [HttpDelete]
        [Route("FailureList/{failureId}")]
        public HttpResponseMessage Delete(int? failureId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new FailureValidateHelper(Failure, ref result, db);
                if (!helper.ValidateById(failureId, out FAILURE failureOrm))
                    return result;

                db.FAILURE.DeleteOnSubmit(failureOrm);
                db.SubmitChanges();

                result = Failure.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }
        */
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