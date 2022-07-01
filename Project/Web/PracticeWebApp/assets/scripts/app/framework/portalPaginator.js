angular.module('app.directives')
    .directive('portalPaginator', [
    function () {
        return {
            template: '<div id="{{paginatorId}}">'
                + '<select id="{{paginatorId}}-select" class="selectpicker pull-right inline-control" title="Число элементов на страницу" data-width="70"'
                + '                        ng-model="model.PageSize"'
                + '            ng-options="count.value as count.name for count in Counts"></select>'
                + '    <pagination class="pagination pull-right"'
                + '            total-items="model.TotalCount"'
                + '            items-per-page="model.PageSize"'
                + '            ng-model="model.PageNumber"'
                + '            max-size="5"'
                + '            boundary-links="true"'
                + '            rotate="false"'
                + '            previous-text="&lsaquo;"'
                + '            next-text="&rsaquo;"'
                + '            first-text="&laquo;"'
                + '            last-text="&raquo;">'
                + '</pagination>'
                + '<div class="btn btn-default pull-right disabled">Всего записей: <b>{{model.TotalCount}}</b></div>'
                + '<div class="clearfix"></div>'
                + '</div>',
            restrict: 'E',
            replace: true,
            scope: {
                model: '=model',
                paginatorId: '=',
                allDisabled: '='
            },
            link: function ($scope, element, attrs) {
                $scope.id = null;
                $scope.init = function () {
                    $scope.Counts = [{ value: 10, name: '10' }, { value: 20, name: '20' }, { value: 50, name: '50' }, { value: 100, name: '100' }, { value: 200, name: '200' }];
                    if (!$scope.allDisabled)
                        $scope.Counts.slice({ value: 9999, name: 'Все' });
                    if (!$scope.model || ($scope.model == null))
                        $scope.model = { PageSize: 10, PageNumber: 1, TotalCount: 0 };
                };

                $scope.init();
                $scope.refreshPicker = function () {
                    setTimeout(function () {
                        $('#' + $scope.paginatorId + '-select').selectpicker('refresh');
                    }, 10);
                };

                $scope.$watch('model.PageSize', function (newValue, oldValue) {
                    $scope.refreshPicker();
                });

            }
        };
    }
    ])