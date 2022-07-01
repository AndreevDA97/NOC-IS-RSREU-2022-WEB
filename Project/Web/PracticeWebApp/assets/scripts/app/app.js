var app = angular.module('app', ['ngRoute', 'app.controllers', 'app.services', 'app.directives', 'ngCookies', 'ui.bootstrap',
    // от helpdesk
    'LocalStorageModule', 'ngResource', 'textAngular', 'checklist-model', 'ngTagsInput', 'cgBusy', 'colorpicker.module', 'http-auth-interceptor', 'ngFileUpload'
]);

app.constant('appType', 'practice');

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'localStorageServiceProvider',
    function ($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider) {

        // возможность работы в отдельных вкладках браузера с разных пользователей
        // localStorageServiceProvider.setStorageType('sessionStorage');
        // возможность возобновления работы пользователя после закрытия вкладки
        localStorageServiceProvider.setStorageType('localStorage');

        /// для того, чтобы убрать # здесь должна быть следующая строка
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                controller: 'mainCtrl',
                templateUrl: './assets/scripts/app/common/controllers/main.html'
            })
            .when('/practice', {
                controller: 'practiceCtrl',
                templateUrl: './assets/scripts/app/practice/practice.html',
            })
            .when('/framework-demo', {
                controller: 'frameworkDemoCtrl',
                templateUrl: './assets/scripts/app/framework/framework-demo.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]).run(['$rootScope', '$location', 'localStorageService',
    function ($rootScope, $location, localStorageService) {

        $rootScope.$on("$locationChangeStart", function (event, newState, oldState) {
            var url = new URL(newState);
            //if (url.pathname == "/test" && url.search == "") {
            // ...
            //}
        });
    }
]);