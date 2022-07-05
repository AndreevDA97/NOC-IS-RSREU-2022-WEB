angular.module('app.directives')
    .directive('abonentList', ['commonFunctions', '$q', '$filter', 'caseService', 'organizationsService',
        function (commonFunctions, $q, $filter, caseService, organizationsService) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/abonent-list.html',
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
                        { name: 'Fio', caption: 'ФИО', type: 0, orderType: 0 },
                        { name: 'Phone', caption: 'Телефон', type: 0 },
                        { name: 'FlatNo', caption: 'Номер комнаты', type: 0 },
                        { name: 'HouseNo', caption: 'Номер дома', type: 0 },
                        { name: 'StreetName', caption: 'Улица', type: 0 },
                        { name: 'actions', caption: 'Действия', type: 1, }
                    ];
                    $scope.actions = [
                        /*0*/startEdit = function (row) {
                            $scope.abonent = angular.copy(row);
                            $scope.abonentAction = 'edit';
                            $('#dlg-abonent-edit').modal('show');
                        },
                        /*1*/startDelete = function (row) {
                            $scope.abonent = row;
                            $('#dlg-abonent-delete').modal('show');
                        },
                    ];
                    $scope.deleteAbonent = function () {
                        caseService.deleteAbonent($scope.abonent.Id)
                            .success(function () {
                                $scope.refresh();
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка удаления: ' + error.Message;
                            });
                    };
                    $scope.addAbonent = function () {
                        $scope.abonent = {};
                        $scope.abonentAction = 'add';
                        $('#dlg-abonent-edit').modal('show');
                    };

                    $scope.resetOrder = function (column) {
                        $scope.getModel.OrderByFio = 0;
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
                            $scope.getModel.OrderByFio = newValue;
                            $scope.refresh();
                        }
                    }

                    $scope.updateLocalFields = function () {
                        if ($scope.abonents == null) return;
                        for (var i = 0; i < $scope.abonents.length; i++) {
                            var row = $scope.abonents[i];
                            row.IsPrimaryHtml = '<div><input type="checkbox" ng-checked="' + row.IsPrimary + '" disabled></div>';
                            var actionRef = '';
                            actionRef += '<button type="button" title="Редактировать" class="btn btn-default btn-xs" ng-click="actions[0](rows[' + i + '])"><span class="glyphicon glyphicon-pencil"></span></button>';
                            actionRef += '<button type="button" title="Удалить" class="btn btn-default btn-xs" ng-click="actions[1](rows[' + i + '])"><span class="glyphicon glyphicon-remove"></span></button>';
                            row.actions = actionRef;
                        }
                    };
                    $scope.loadPromise = { message: 'Загрузка абонентов...' };
                    $scope.refresh = function () {
                        $scope.abonents = null;
                        $scope.error = null;

                        $scope.loadPromise.promise = caseService.getAbonents($scope.getModel)
                            .success(function (data) {
                                $scope.abonents = data.Data;
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
                        $scope.getModel.Fio = null;
                        $scope.getModel.StreetId = null;
                        setTimeout(function () {
                            $('#getmodel-street').val('default');
                            $('.selectpicker').selectpicker('refresh');
                            $scope.$apply();
                        }, 0);
                    };

                    $scope.$watchCollection('[getModel.PageSize, getModel.PageNumber]', function (newValues, oldValues) {
                        if ($scope.abonents == null) return;
                        $scope.refresh();
                    });

                    $scope.getStreets = function () {
                        $scope.error = null;
                        return caseService.getStreetValues()
                            .success(function (data) {
                                $scope.streets = data;
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка загрузки: ' + error.Message;
                            });
                    };

                    $scope.$watch('currentPage', function (newValue, oldValue) {
                        if (newValue == 'abonent-list') {
                            $q.all([
                                $scope.getStreets()
                            ]).then(function () {
                                $scope.refresh();
                            });
                        }
                    });
                }
            };
        }
    ])