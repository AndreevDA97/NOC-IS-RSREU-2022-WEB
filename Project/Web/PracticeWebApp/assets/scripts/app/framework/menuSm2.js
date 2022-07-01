angular.module('app.directives')
    .directive('menuSm2', [
        function () {
            return {
                template: '<div class="col-sm-2">' +
                    '<ul class="nav nav-stacked side-pills">' +
                    '<li ng-repeat-start="link in menuLinks" ng-if="!link.subItems" class="pointer-cursor" ng-class="{\'active\': link.active}" ng-show="!link.hidden">' +
                    '<a ng-href="{{link.href}}" ng-click="linkClick(link)">{{link.caption}}</a>' +
                    '</li>' +
                    '<li ng-if="link.subItems" ng-click="collapseClick(link)" ng-show="!link.hidden">' +
                    '<a href="#">{{link.caption}} <span class="side-pills-lvl2-arr glyphicon" ng-class="{\'glyphicon-triangle-bottom\': !link.expanded, \'glyphicon-triangle-top\': link.expanded}"></span></a>' +
                    '</li>' +
                    '<ul ng-repeat-end ng-if="link.subItems" id="ul_collapse_{{link.name}}" class="nav nav-stacked side-pills-lvl2" ng-show="link.expanded && !link.hidden">' +
                    '<li ng-repeat="subItem in link.subItems" ng-if="link.subItems" class="pointer-cursor" ng-class="{\'active\': subItem.active}" ng-show="!subItem.hidden">' +
                    '<a ng-href="{{subItem.href}}" ng-click="linkClick(subItem)">{{subItem.caption}}</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                restrict: 'E',
                replace: true,
                scope: {
                    menuLinks: '=menulinks',
                },
                link: function ($scope, element, attrs) {
                    $scope.linkClick = function(link) {
                        if (link.ngclick)
                            link.ngclick();
                    };

                    $scope.collapseClick = function(link) {
                        if (link) {
                            link.expanded = !link.expanded;
                        }
                    };
                }
            };
        }])