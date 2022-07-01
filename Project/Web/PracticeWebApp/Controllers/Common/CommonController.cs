using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using AbonentPlus.PaySystem.VersionNs;
using PaySystemServer.DataBaseCommon;
using PaySystemWebCommon.Classes;
using PaySystemWebCommon.Dto;

namespace PracticeWebApp.Controllers.Common
{
    /// <summary>
    /// Вспомогательный контроллер
    /// </summary>
    [RoutePrefix("api/Common")]
    public class CommonController : ApiController
    {
        /// <summary>
        /// Тестовый метод проверки API
        /// </summary>
        /// <remarks>
        /// Используется для проверки работоспособности сервиса
        /// </remarks>
        /// <returns>Возвращает "+"</returns>
        [HttpPost]
        [Route("ApiTest")]
        [AllowAnonymous]
        public HttpResponseMessage ApiTestMethod()
        {
            var result = new HttpResponseMessage();
            // доп. проверка контекста базы данных
            using (var db = DataBase.GetNew())
                result = Request.CreateResponse(HttpStatusCode.OK, "+");
            return result;
        }
    }
}