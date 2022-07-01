using System.Configuration;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using log4net.Config;
using Newtonsoft.Json.Converters;
using System;

namespace PracticeWebApp
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // код выполняется при запуске приложения
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            XmlConfigurator.Configure();
            // настройка сериализации по умолчанию
            var dateTimeConverter = new IsoDateTimeConverter { DateTimeFormat = "dd.MM.yyyy" };
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings
                .Converters.Add(dateTimeConverter);
            // отловить первый запрос приложения
            var appDomainTimestamp = (DateTime?)AppDomain.CurrentDomain
                .GetData("APPDOMAIN_TIMESTAMP");
            if (!appDomainTimestamp.HasValue)
            {
                // зафиксировать первый запрос приложения
                AppDomain.CurrentDomain.SetData("APPDOMAIN_TIMESTAMP", DateTime.Now);
                // ...
            }
        }
    }
}