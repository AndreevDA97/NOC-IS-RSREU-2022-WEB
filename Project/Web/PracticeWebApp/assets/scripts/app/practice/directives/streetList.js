angular.module('app.directives')
    .directive('streetList', ['commonFunctions', '$q', '$filter', 'caseService', 'organizationsService',
        function (commonFunctions, $q, $filter, caseService, organizationsService) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/street-list.html',
                restrict: 'E',
                replace: true,
                scope: {
                    currentPage: '=',
                },
                link: function ($scope, element, attrs) {

                    $scope.initModel = function () {
                        $scope.accountFullCompare = true;
                        $scope.getModel = { PageSize: commonFunctions.defaultPageSize(), PageNumber: 1, TotalCount: 0 };
                        $scope.PageNumber = 1;
                    };

                    $scope.initModel();
                    $scope.filterCollapsed = true;
                    commonFunctions.refreshEditorStyles();

                    $scope.columns = [
                        { name: 'Id', caption: 'Код', type: 0, orderType: 0 },
                        { name: 'Name', caption: 'Улица', type: 0 },
                        { name: 'actions', caption: 'Действия', type: 1, }
                    ];
                    $scope.actions = [
                        /*0*/startEdit = function (row) {
                            $scope.street = angular.copy(row);
                            $scope.streetAction = 'edit';
                            $('#dlg-street-edit').modal('show');
                        },
                        /*1*/startDelete = function (row) {
                            $scope.street = row;
                            $('#dlg-street-delete').modal('show');
                        },
                    ];
                    $scope.deleteStreet = function () {
                        caseService.deleteStreet($scope.street.Id)
                            .success(function () {
                                $scope.refresh();
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка удаления: ' + error.Message;
                            });
                    };
                    $scope.addStreet = function () {
                        $scope.street = {};
                        $scope.streetAction = 'add';
                        $('#dlg-street-edit').modal('show');
                    };

                    $scope.resetOrder = function (column) {
                        $scope.getModel.OrderByName = 0;
                        $scope.getModel.PageNumber = 1;
                        for (var i = 0; i < $scope.columns.length; i++) {
                            if ($scope.columns[i].orderType != undefined && $scope.columns[i] != column)
                                $scope.columns[i].orderType = 0;
                        }
                    };
                    $scope.$watch('columns[0].orderType', function (newValue, oldValue) {
                        changeOrderType($scope.columns[0], newValue, oldValue);
                    });
                    function changeOrderType(column, newValue, oldValue) {
                        if ($scope.stopRefreshList) return;
                        if (newValue != oldValue) {
                            $scope.stopRefreshList = true;
                            $scope.resetOrder(column);
                            $scope.getModel.OrderByName = newValue;
                            $scope.refresh();
                        }
                    }

                    $scope.updateLocalFields = function () {
                        if ($scope.streets == null) return;
                        for (var i = 0; i < $scope.streets.length; i++) {
                            var row = $scope.streets[i];
                            var actionRef = '';
                            actionRef += '<button type="button" title="Редактировать" class="btn btn-default btn-xs" ng-click="actions[0](rows[' + i + '])"><span class="glyphicon glyphicon-pencil"></span></button>';
                            actionRef += '<button type="button" title="Удалить" class="btn btn-default btn-xs" ng-click="actions[1](rows[' + i + '])"><span class="glyphicon glyphicon-remove"></span></button>';
                            row.actions = actionRef;
                        }
                    };
                    $scope.loadPromise = { message: 'Загрузка абонентов...' };
                    $scope.refresh = function () {
                        $scope.streets = null;
                        $scope.error = null;

                        $scope.loadPromise.promise = caseService.getStreets($scope.getModel)
                            .success(function (data) {
                                $scope.streets = data.Data;
                                $scope.getModel.TotalCount = data.TotalCount;
                                $scope.updateLocalFields();
                                $scope.stopRefreshList = false;
                                setTimeout(function () {
                                    $('.selectpicker').selectpicker('refresh');
                                }, 0);
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка загрузки: ' + error.Message;
                            });
                    };

                    $scope.resetFilter = function () {
                        $scope.getModel.Name = null;
                        setTimeout(function () {
                            $('#getmodel-street').val('default');
                            $('.selectpicker').selectpicker('refresh');
                            $scope.$apply();
                        }, 0);
                    };

                    $scope.$watchCollection('[getModel.PageSize, getModel.PageNumber]', function (newValues, oldValues) {
                        if ($scope.streets == null) return;
                        $scope.refresh();
                    });

                    $scope.$watch('currentPage', function (newValue, oldValue) {
                        if (newValue == 'street-list') {
                            $q.all([
                            ]).then(function () {
                                $scope.refresh();
                            });
                        }
                    });
                }
            };
        }
    ])