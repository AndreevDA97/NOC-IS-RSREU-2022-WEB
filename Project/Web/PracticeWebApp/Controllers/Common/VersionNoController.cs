using System.Reflection;
using System.Web.Http;
using AbonentPlus.PaySystem.VersionNs;
using PaySystemWebCommon.Classes;
using PaySystemWebCommon.Dto;

namespace PracticeWebApp.Controllers.Common
{
    public class VersionNoController : ApiController
    {
        [HttpPost]
        public VersionNo GetVersionNo()
        {
            return new VersionNo(Assembly.GetAssembly(GetType()).GetName().Version);
        }
    }
}