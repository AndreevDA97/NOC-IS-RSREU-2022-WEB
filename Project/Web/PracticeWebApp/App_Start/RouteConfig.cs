using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PracticeWebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("{*allaspx}", new { allaspx = @".*\.aspx(/.*)?" });

            //routes.MapPageRoute("Default", "{*anything}", "~/assets/views/index.html");
            routes.MapRoute("Default", "{*anything}", new { controller = "Index", action = "Index" });
        }
    }
}
