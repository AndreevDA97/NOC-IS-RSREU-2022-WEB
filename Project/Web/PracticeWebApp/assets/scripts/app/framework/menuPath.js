angular.module('app.directives')
    .directive('menuPath', [
        function () {
            return {
                template: '<ol class="breadcrumb"> <li ng-repeat="link in menuLinks" ng-class="{\'active\': link.active}">{{link.active ? link.caption : \'\'}}<a class="pointer-cursor" ng-href="{{link.href}}" ng-click="linkClick(link)" ng-show="!link.active">{{link.caption}}</a></li></ol>',
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