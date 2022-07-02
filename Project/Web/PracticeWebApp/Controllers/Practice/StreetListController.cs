using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PaySystemWebCommon.Dto.Common;
using PaySystemWebCommon.Helpers.Common;
using PracticeWebApp.Dto.Practice;
using PracticeWebApp.Helpers.Practice;
using PracticeWebApp.Models.Practice;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Controllers.Practice
{
    [RoutePrefix("api/Practice")]
    public class StreetListController : ApiController
    {
        [HttpPost]
        [Route("StreetList")]
        public GetStreetListModel Get(GetStreetListModel model)
        {
            using (var db = DataBase.GetNew())
            {
                // Фильтрация
                var query = model.GetQuery(db);
                // Выполнение запроса
                model.TotalCount = query.Count();
                model.Data = query.Pagination(model)
                    .Select(StreetDto.Map)
                    .ToList();
            }
            return model;
        }
        [HttpPut]
        [Route("StreetList/{streetId}")]
        public HttpResponseMessage Put(int? streetId, [FromBody] StreetDto streetDto)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);

                if (streetId.HasValue) // редактирование
                {
                    if (!helper.ValidateById(streetId, out STREET streetOrm))
                        return result;

                    streetDto.ToOrm(streetOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
                else // добавление
                {
                    var streetOrm = streetDto.ToOrm(null);
                    db.STREET.InsertOnSubmit(streetOrm);
                    db.SubmitChanges();

                    result = Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            return result;
        }
        [HttpDelete]
        [Route("StreetList/{streetId}")]
        public HttpResponseMessage Delete(int? streetId)
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var helper = new RequestValidateHelper(Request, ref result, db);
                if (!helper.ValidateById(streetId, out STREET streetOrm))
                    return result;

                db.STREET.DeleteOnSubmit(streetOrm);
                db.SubmitChanges();

                result = Request.CreateResponse(HttpStatusCode.OK);
            }
            return result;
        }


        [HttpPost]
        [Route("StreetList4Select")]
        public HttpResponseMessage Get()
        {
            var result = new HttpResponseMessage();
            using (var db = DataBase.GetNew())
            {
                var list = db.ABONENT;
                var values = db.STREET
                    .Select(s => new
                    {
                        Id = s.STREETCD,
                        Name = s.STREETNM
                    })
                    .ToList();

                result = Request.CreateResponse(HttpStatusCode.OK, values);
            }
            return result;
        }
    }
}