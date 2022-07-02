using AbonentPlus.PaySystem.Server.PaySystemORM;
using PaySystemWebCommon.Classes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace PracticeWebApp.Helpers.Practice
{
    public class RequestValidateHelper
    {
        private HttpRequestMessage Request { get; set; }
        private HttpResponseMessage Result
        {
            get
            {
                return result;
            }
            set
            {
                result.StatusCode = value.StatusCode;
                result.Content = value.Content;
            }
        }
        private HttpResponseMessage result;
        private PaySystemDataBase db;
        public RequestValidateHelper(HttpRequestMessage request, ref HttpResponseMessage result, PaySystemDataBase db)
        {
            Request = request;
            this.result = result;
            this.db = db;
        }

        #region Фильтрация запросов
        public bool ValidateById(int? abonentId, out ABONENT abonentOrm)
        {
            abonentOrm = null;
            if (!abonentId.HasValue)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Не указан идентификатор абонента."));
                return false;
            }
            abonentOrm = db.ABONENT.SingleOrDefault(c => c.ACCOUNTCD == abonentId.ToString());
            if (abonentOrm == null)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Указанный абонент не найден."));
                return false;
            }
            return true;
        }
        public bool ValidateById(int? streetId, out STREET streetOrm)
        {
            streetOrm = null;
            if (!streetId.HasValue)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Не указан идентификатор абонента."));
                return false;
            }
            streetOrm = db.STREET.SingleOrDefault(c => c.STREETCD == streetId);
            if (streetOrm == null)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Указанный абонент не найден."));
                return false;
            }
            return true;
        }

        public bool ValidateById(int? requestId, out REQUEST requestOrm)
        {
            requestOrm = null;
            if (!requestId.HasValue)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Не указан идентификатор заявки."));
                return false;
            }
            requestOrm = db.REQUEST.SingleOrDefault(c => c.REQUESTCD == requestId);
            if (requestOrm == null)
            {
                Result = Request.CreateResponse(HttpStatusCode.BadRequest,
                            new WebError("Указанная заявка не найдена."));
                return false;
            }
            return true;
        }

        #endregion
    }
}