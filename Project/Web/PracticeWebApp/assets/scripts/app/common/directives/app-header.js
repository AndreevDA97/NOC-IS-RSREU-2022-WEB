angular.module('app.directives')
    .directive('appheader', ['$location',
        function ($location) {
            return {
                templateUrl: './assets/scripts/app/common/directives/app-header.html',
                restrict: 'E',
                replace: true,
                link: function ($scope, element, attrs) {
                    attrs.$observe('currentTab', function (value) {
                    });
                }
            };
        }]);