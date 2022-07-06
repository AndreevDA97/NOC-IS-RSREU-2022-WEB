angular.module('app.controllers').controller('practiceCtrl', ['$rootScope', '$scope', 'menuService', '$location', '$routeParams', 'caseService',
    function ($rootScope, $scope, menuService, $location, $routeParams, caseService) {
        $scope.currentTab = 'practice';
        $scope.page = $routeParams.page;

        $scope.setMenuLinksItem = function (menuItem, dontModifyLocation) {
            if (!menuItem.hidden)
                menuService.setActiveItem($scope.menuLinks, menuItem);
            menuService.refreshLastPathItem($scope.menuPath, menuItem);
            $scope.currentShow = menuItem.name;
            if (!dontModifyLocation) {
                $location.search({ page: $scope.currentShow });
            }
        };

        $scope.menuLinks = [];
        $scope.menuPath = [];
        $scope.currentShow = '';
        $scope.menuLinks.push({ href: '', caption: 'Общие сведения', ngclick: function () { $scope.setMenuLinksItem(this); }, name: 'general-info' });
        $scope.menuLinks.push({
            href: '', caption: 'Справочники', name: 'nsiGroup', subItems: [
                { href: '', caption: 'Абоненты', ngclick: function () { $scope.setMenuLinksItem(this); }, name: 'abonent-list' },
                { href: '', caption: 'Улицы', ngclick: function () { $scope.setMenuLinksItem(this); }, name: 'street-list' },
                { href: '', caption: 'Заявки', ngclick: function () { $scope.setMenuLinksItem(this); }, name: 'request-list' }
            ], expanded: true
        });

        $scope.menuPath = [];
        menuService.addToPath($scope.menuPath, { href: '/practice', caption: 'Практика' });

        // --------------------------------

        $scope.rootUrl = '/practice';
        menuService.refreshHrefs($scope.menuLinks, $scope.rootUrl);
        angular.forEach($scope.menuLinks, function (item) {
            if (angular.isArray(item.subItems)) {
                menuService.refreshHrefs(item.subItems, $scope.rootUrl);
            }
        });
        angular.forEach($scope.menuLinks, function (item) {
            if (angular.isArray(item.subItems)) {
                item.href ='';
            }
        });
        menuService.addToPath($scope.menuPath, { href: '', caption: '' });

        var itemName = $scope.page;
        $scope.pageMenuItem = menuService.getItemByName($scope.menuLinks, itemName);
        if (!$scope.pageMenuItem)
            $scope.pageMenuItem = $scope.menuLinks[0]; // страница по умолчанию
        $scope.setMenuLinksItem($scope.pageMenuItem, true);
    }
]);

