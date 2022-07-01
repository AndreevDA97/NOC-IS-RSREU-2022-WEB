angular.module('app.directives')
    .directive('menuNavtabs', [
        function () {
            return {
                template: '<div><ul class="nav nav-tabs nav-justified"><li ng-repeat="link in menuLinks" class="pointer-cursor" ng-class="{\'active\': link.active}"><a ng-href="{{link.href}}" ng-click="linkClick(link)">{{link.caption}}</a></li></ul></div>',
                restrict: 'E',
                replace: true,
                scope: {
                    menuLinks: '=menulinks',
                },
                link: function ($scope, element, attrs) {
                    $scope.linkClick = function (link) {
                        if (link.ngclick)
                            link.ngclick();
                    }
                }
            };
        }])