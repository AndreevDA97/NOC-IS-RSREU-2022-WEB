using System;
using System.Configuration;
using System.Reflection;
using System.Web;
using System.Web.Optimization;
using AbonentPlus.PaySystem.VersionNs;
using BundleTransformer.Core.Bundles;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;

namespace PracticeWebApp
{
    public class BundleConfig
    {
        public static string ProjectVersion =>
            $"{Assembly.GetExecutingAssembly().GetName().Version}";
        public static string GetBundlePath(string bundleName)
        {
            return $"{DefaultBundlePath}/" + bundleName + $"-{ProjectVersion}";
        }
        public const string DefaultBundlePath = "~/assets/bundles";
        public static IHtmlString RenderStyles(string bundleName)
        {
            return Styles.Render(GetBundlePath(bundleName));
        }
        public static IHtmlString RenderScripts(string bundleName)
        {
            return Scripts.Render(GetBundlePath(bundleName));
        }
        public class LessBundler
        {
            private static readonly NullOrderer orderer = new NullOrderer();

            /// <summary>
            /// Create new less bundle. Directory "~/bundles/css" uses by default
            /// </summary>
            public static CustomStyleBundle Create(string bundleName)
            {
                var path = GetBundlePath(bundleName);
                var bundle = new CustomStyleBundle(path);
                var cssTransformer = new StyleTransformer();
                bundle.Transforms.Add(cssTransformer);
                bundle.Orderer = orderer;
                return bundle;
            }
        }
        public class CustomScriptBundler
        {
            public static ScriptBundle Create(string bundleName)
            {
                return new ScriptBundle(GetBundlePath(bundleName));
            }
        }
        public class CustomStyleBundler
        {
            public static StyleBundle Create(string bundleName)
            {
                return new StyleBundle(GetBundlePath(bundleName));
            }
        }
        public class CustomBundler
        {
            public static Bundle Create(string bundleName)
            {
                return new Bundle(GetBundlePath(bundleName));
            }
        }

        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles, Version projectVersion = null)
        {
            BundleTable.EnableOptimizations = ConfigurationManager.AppSettings["debugScripts"] != "true";
            if (BundleTable.EnableOptimizations)
            {   // компиляция less
                bundles.Add(
                    LessBundler.Create("practice-css")
                        .Include("~/assets/styles/less/abonentplus.less"));
                bundles.Add(
                    LessBundler.Create("bootstrap-datepicker-css")
                        .Include("~/assets/styles/less/bootstrap-datepicker.less"));
            }
            else
            {   // готовые стили
                bundles.Add(
                    LessBundler.Create("practice-css")
                        .Include("~/assets/styles/debug/practice.css"));
                bundles.Add(
                    LessBundler.Create("bootstrap-datepicker-css")
                        .Include("~/assets/styles/debug/bootstrap-datepicker.css"));
            }
            bundles.Add(CustomScriptBundler.Create("jquery").Include(
                "~/assets/scripts/vendor/jquery/jquery-2.1.1.min.js",
                "~/assets/scripts/vendor/jquery/jquery.mousewheel.js",
                "~/assets/scripts/vendor/jquery/jquery.mCustomScrollbar.js",
                "~/assets/scripts/vendor/jquery/jquery.cookie.js",
                "~/assets/scripts/vendor/jquery/jquery.inputmask.js",
                "~/assets/scripts/vendor/jquery/jquery.json-2.4.min.js",
                "~/assets/scripts/vendor/jquery/jquery-ui.js"
                ));
            bundles.Add(CustomScriptBundler.Create("jqplot").Include(
                "~/assets/scripts/vendor/jqplot/jquery.jqplot.js",
                "~/assets/scripts/vendor/jqplot/jqplot.barRenderer.js",
                "~/assets/scripts/vendor/jqplot/jqplot.highlighter.js",
                "~/assets/scripts/vendor/jqplot/jqplot.cursor.js",
                "~/assets/scripts/vendor/jqplot/jqplot.categoryAxisRenderer.js",
                "~/assets/scripts/vendor/jqplot/jqplot.pointLabels.js",
                "~/assets/scripts/vendor/jqplot/jqplot.dateAxisRenderer.js"
                ));
            bundles.Add(CustomScriptBundler.Create("bootstrap").Include(
                "~/assets/scripts/vendor/bootstrap/bootstrap.js",
                "~/assets/scripts/vendor/bootstrap/bootstrap-select.js",
                "~/assets/scripts/vendor/bootstrap/defaults-ru-RU.js",
                "~/assets/scripts/vendor/bootstrap/moment-with-langs.js",
                "~/assets/scripts/vendor/bootstrap/bootstrap-datetimepicker.ru.js",
                "~/assets/scripts/vendor/bootstrap/bootstrap-datetimepicker.js",
                "~/assets/scripts/vendor/bootstrap/bootstrap-datepicker.js",
                "~/assets/scripts/vendor/bootstrap/offcanvas.js"
                ));
            bundles.Add(CustomScriptBundler.Create("bootstrapUI").Include(
                "~/assets/scripts/vendor/bootstrap/ui-bootstrap-tpls-0.12.1.js"
                ));
            bundles.Add(CustomScriptBundler.Create("angular").Include(
                "~/assets/scripts/vendor/angular/angular.min.js",
                "~/assets/scripts/vendor/angular/angular-locale_ru-ru.js",
                "~/assets/scripts/vendor/angular/angular-route.min.js",
                "~/assets/scripts/vendor/angular/angular-cookies.min.js",
                "~/assets/scripts/vendor/angular/angular-bootstrap-select.js"
                ));
            bundles.Add(CustomScriptBundler.Create("appStart").Include(
                "~/assets/scripts/app/common/standart/app.directives.js",
                "~/assets/scripts/app/common/standart/app.controllers.js",
                "~/assets/scripts/app/common/standart/app.services.js",
                "~/assets/scripts/app/app.js",
                "~/assets/scripts/app/appCtrl.js"));

            bundles.Add(CustomScriptBundler.Create("abonentFramework").Include(
                "~/assets/scripts/app/framework/_commonServices.js",
                "~/assets/scripts/app/framework/bytes.js",
                "~/assets/scripts/app/framework/circularPercentageBar.js",
                "~/assets/scripts/app/framework/confirmDialog.js",
                "~/assets/scripts/app/framework/dataTable.js",
                "~/assets/scripts/app/framework/fileUpload.js",
                "~/assets/scripts/app/framework/framework-demo.js",
                "~/assets/scripts/app/framework/loader.js",
                "~/assets/scripts/app/framework/menuNavtabs.js",
                "~/assets/scripts/app/framework/menuPath.js",
                "~/assets/scripts/app/framework/menuSm2.js",
                "~/assets/scripts/app/framework/messageDialog.js",
                "~/assets/scripts/app/framework/organizationsService.js",
                "~/assets/scripts/app/framework/passwordService.js",
                "~/assets/scripts/app/framework/portalPaginator.js"
                ));

            bundles.Add(CustomScriptBundler.Create("appCommon").Include(
                "~/assets/scripts/app/common/services/*.js",
                "~/assets/scripts/app/common/directives/*.js",
                "~/assets/scripts/app/common/controllers/*.js",
                "~/assets/scripts/app/common/filters/*.js"
                ));
            bundles.Add(CustomScriptBundler.Create("components").Include(
                "~/assets/components/angular-local-storage/angular-local-storage.min.js",
                "~/assets/components/angular-resource/angular-resource.min.js",
                "~/assets/components/checklist-model/checklist-model.js",
                "~/assets/components/ng-tags-input/ng-tags-input.js",
                "~/assets/components/angular-busy/angular-busy.min.js",
                "~/assets/components/angular-bootstrap-colorpicker/bootstrap-colorpicker-module.js",
                "~/assets/components/http-auth-interceptor/http-auth-interceptor.js",
                "~/assets/components/ng-file-upload/ng-file-upload-all.min.js",
                "~/assets/components/keymaster/keymaster.js",
                "~/assets/components/oi-file/oi.file.js"
                ));
            bundles.Add(CustomStyleBundler.Create("components-css").Include(
                "~/assets/styles/font-awesome.css",
                "~/assets/styles/circular-percentage-bar.css",
                "~/assets/components/textAngular/textAngular.css",
                "~/assets/components/ng-tags-input/ng-tags-input.css",
                "~/assets/components/ng-tags-input/ng-tags-input.bootstrap.css",
                "~/assets/components/angular-busy/angular-busy.min.css",
                "~/assets/components/angular-bootstrap-colorpicker/colorpicker.css"
                ));

            //textAngular.min.js не минифицируется
            bundles.Add(CustomBundler.Create("textAngular").Include(
                 "~/assets/components/textAngular/textAngular-rangy.min.js",
                 "~/assets/components/textAngular/textAngular-sanitize.min.js",
                 "~/assets/components/textAngular/textAngular.min.js"
                 ));

            bundles.Add(CustomScriptBundler.Create("practice").Include(
                "~/assets/scripts/app/practice/*.js",
                "~/assets/scripts/app/practice/services/*.js",
                "~/assets/scripts/app/practice/directives/*.js",
                "~/assets/scripts/app/practice/directives/dialogs/*.js"
            ));
        }
    }
}