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
    public class EXECUTORListController : ApiController
    {
        /*
        [HttpPost]
        [Route("ExecutorList")]
        public GetExecutorListModel Get(GetExecutorListModel model)
        {
            using (var db = DataBase.GetNew())
            {
                // Фильтрация
                var query = model.GetQuery(db);
                // Выполнение запроса
                model.TotalCount = query.Count();
                model.Data = query.Pagination(model)
                    .Select(ExecutorDto.Map)
                    .ToList();
            }
            return model;
        }
        [HttpPut]
        [Route("ExecutorList/{executorId}")]
        public HttpResponseMessage Put(int? executorId, [FromBody]ExecutorDto executorDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new ExecutorValidateHelper(Executor, ref result, db);

                if (executorId.HasValue) // редактирование
                {
                    if (!helper.ValidateById(executorId, out EXECUTOR executorOrm))
                        return result;

                    executorDto.ToOrm(executorOrm);
                    db.SubmitChanges();

                    result = Executor.CreateResponse(HttpStatusCode.OK);
                }
                else // добавление
                {
                    var errorMessage = executorDto.IsValidate();
                    if (!string.IsNullOrEmpty(errorMessage))
					{
                        result = Executor.CreateResponse(HttpStatusCode.BadExecutor, new WebError(errorMessage));
                        return result;
                    }
                    var executorOrm = executorDto.ToOrm(null);
                    db.EXECUTOR.InsertOnSubmit(executorOrm);
                    db.SubmitChanges();

                    result = Executor.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }
        [HttpDelete]
        [Route("ExecutorList/{executorId}")]
        public HttpResponseMessage Delete(int? executorId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new ExecutorValidateHelper(Executor, ref result, db);
                if (!helper.ValidateById(executorId, out EXECUTOR executorOrm))
                    return result;

                db.EXECUTOR.DeleteOnSubmit(executorOrm);
                db.SubmitChanges();

                result = Executor.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }
        */
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
                        Name = a.Fio
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}