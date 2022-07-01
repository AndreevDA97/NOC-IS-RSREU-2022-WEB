using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;

namespace PaySystemWebCommon.Classes
{
    public class ApiHttpControllerRouteHandler : HttpControllerRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(
            RequestContext requestContext)
        {
            return new ApiHttpControllerHandler(requestContext.RouteData);
        }
    }
}