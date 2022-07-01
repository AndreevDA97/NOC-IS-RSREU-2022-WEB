angular.module('app.controllers').controller('mainCtrl', ['$scope', 'organizationService', '$location', 'commoninfoService', '$sce', '$cookies', 'commonFunctions', '$routeParams',
    function ($scope, organizationService, $location, commoninfoService, $sce, $cookies, commonFunctions, $routeParams) {
        $scope.currentTab = "main";
        if ($scope.user != null) {
            $scope.organization = null;
            $scope.beta = $routeParams.beta;
            $scope.organizationLoading = true;
            $scope.organizationError = null;
            $scope.getOrganization = function() {
                organizationService.getCurrentOrganization()
                    .success(function(data) {
                        $scope.error = null;
                        if (!data) $scope.organizationError = 'Организация не существует.';
                        if ($scope.organizationError) return;
                        $scope.organization = data;
                        $scope.organizationLoading = false;

                    })
                    .error(function(error) {
                        $scope.organizationError = 'Ошибка загрузки информации об организации: ' + error.Message;
                        $scope.organizationLoading = false;
                    });
            };
            $scope.getOrganization();
            $scope.goto = function (url) {
                $location.path(url);
            }

            //$("#wiki").ready(function () {
            //    setTimeout(function () {
            //        var iframe = document.getElementById('wiki');
            //        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            //        if (innerDoc.getElementById('wpName1'))
            //            innerDoc.getElementById('wpName1').value = 'guest';
            //    }, 1000);
            //});

            $scope.getProjectNews = function () {
                $scope.newsLoadPromise = { message: 'Загрузка...' };
                $scope.newsError = null;
                var model = { PageSize: 5, PageNumber: 1, TotalCount: 0, };
                $scope.newsLoadPromise.promise = commoninfoService.getProjectNews(model)
                    .success(function (data) {
                        $scope.projectNews = data.Data;
                    })
                    .error(function (error) {
                        $scope.newsError = 'Ошибка загрузки информации об организации: ' + error.Message;
                    });
            };
            $scope.getProjectNews();

            $scope.showNews = function (news) {
                $scope.currentNews = news;
                $('#show-сurrent-news').modal('show');
            };

            $scope.toTrusted = function (url) {
                return $sce.trustAsResourceUrl(url);
            }
        }
    }
]);