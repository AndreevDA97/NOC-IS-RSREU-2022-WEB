angular.module('app.directives')
    .directive('appfooter', ['versionFactory', 'commonFunctions',
        function (versionFactory, commonFunctions) {
            return {
                templateUrl: './assets/scripts/app/common/directives/app-footer.html',
                restrict: 'E',
                replace: true,
                link: function ($scope, element, attrs) {
                    attrs.$observe('', function (value) {
                    });

                    $scope.currentYear = new Date().getFullYear();



                    $scope.getVersion = function() {
                        $scope.versionNo = {
                            VersionStr: ''
                        };
                        $scope.versionNo = versionFactory.get();
                    };

                    $scope.getVersion();

                    commonFunctions.refreshEditorStyles();

                    angular.element(document).ready(function () {
                        setTimeout(function () {
                            commonFunctions.refreshEditorStyles();
                        }, 0);
                    });

                }
            };
        }])