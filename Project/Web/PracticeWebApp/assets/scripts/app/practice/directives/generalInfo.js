angular.module('app.directives')
    .directive('generalInfo', ['commonFunctions', '$q', '$filter', 'caseService', 'organizationsService',
        function (commonFunctions, $q, $filter, caseService, organizationsService) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/general-info.html',
                restrict: 'E',
                replace: true,
                scope: {
                    currentPage: '=',
                },
                link: function ($scope, element, attrs) {

                    commonFunctions.refreshEditorStyles();

                    $scope.$watch('currentPage', function (newValue, oldValue) {
                        if (newValue == 'general-info') {
                            // ...
                        }
                    });
                }
            };
        }
    ])