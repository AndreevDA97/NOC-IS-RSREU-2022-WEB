angular.module('app.directives')
    .directive('requestList', ['commonFunctions', '$q', '$filter', 'caseService', 'organizationsService',
        function (commonFunctions, $q, $filter, caseService, organizationsService) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/request-list.html',
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
                        { name: 'AccountId', caption: 'Лицевой счет абонента', type: 0 },
                        { name: 'ExecutorId', caption: 'Код выполнителя', type: 0 },
                        { name: 'FailureId', caption: 'Поломка', type: 0 },
                        { name: 'IncomingDate', caption: 'Дата поступления', type: 0 },
                        { name: 'ExecutionDate', caption: 'Дата выполнения', type: 0 },
                        { name: 'Executed', caption: 'Выполнение', type: 0 },
                        { name: 'actions', caption: 'Действия', type: 1, }
                    ];
                    $scope.actions = [
                        /*0*/startEdit = function (row) {
                            $scope.request = angular.copy(row);
                            $scope.requestAction = 'edit';
                            $('#dlg-request-edit').modal('show');
                        },
                        /*1*/startDelete = function (row) {
                            $scope.request = row;
                            $('#dlg-request-delete').modal('show');
                        },
                    ];
                    $scope.deleteRequest = function () {
                        caseService.deleteRequest($scope.request.Id)
                            .success(function () {
                                $scope.refresh();
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка удаления: ' + error.Message;
                            });
                    };
                    $scope.addRequest = function () {
                        $scope.request = {};
                        $scope.requestAction = 'add';
                        $('#dlg-request-edit').modal('show');
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
                        if ($scope.request == null) return;
                        for (var i = 0; i < $scope.request.length; i++) {
                            var row = $scope.request[i];
                            var actionRef = '';
                            actionRef += '<button type="button" title="Редактировать" class="btn btn-default btn-xs" ng-click="actions[0](rows[' + i + '])"><span class="glyphicon glyphicon-pencil"></span></button>';
                            actionRef += '<button type="button" title="Удалить" class="btn btn-default btn-xs" ng-click="actions[1](rows[' + i + '])"><span class="glyphicon glyphicon-remove"></span></button>';
                            row.actions = actionRef;
                        }
                    };
                    $scope.loadPromise = { message: 'Загрузка заявок...' };
                    $scope.refresh = function () {
                        $scope.request = null;
                        $scope.error = null;

                        $scope.loadPromise.promise = caseService.getRequest($scope.getModel)
                            .success(function (data) {
                                $scope.requests = data.Data;
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
                            $('#getmodel-request').val('default');
                            $('.selectpicker').selectpicker('refresh');
                            $scope.$apply();
                        }, 0);
                    };

                    $scope.$watchCollection('[getModel.PageSize, getModel.PageNumber]', function (newValues, oldValues) {
                        if ($scope.request == null) return;
                        $scope.refresh();
                    });

                    $scope.$watch('currentPage', function (newValue, oldValue) {
                        if (newValue == 'request-list') {
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