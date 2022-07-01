using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace PaySystemWebCommon.Classes
{
    public class ApiHttpControllerHandler
        : HttpControllerHandler, IRequiresSessionState
    {
        public ApiHttpControllerHandler(RouteData routeData)
            : base(routeData)
        {
        }
    }
}