using System;
using System.Net;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataProtection;
using Owin;

[assembly: OwinStartup(typeof(PracticeWebApp.Owin.Startup))]
namespace PracticeWebApp.Owin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            app.UseWebApi(config);
            ServicePointManager.Expect100Continue = false; // без этого не проходят POST запросы с файлами
        }

        public static IDataProtector DataProtector;
    }
}