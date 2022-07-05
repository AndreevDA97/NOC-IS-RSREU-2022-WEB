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
                        { name: 'AbonentFio', caption: 'Абонент', type: 0, orderType: 0 },
                        { name: 'ExecutorFio', caption: 'Слесарь', type: 0 },
                        { name: 'FailureName', caption: 'Неисправность', type: 0 },
                        {
                            orderField: "OrderByIncomingDate", name: request => request.IncomingDate.toLocaleDateString("ru-RU"),
                            caption: 'Дата оформления', type: 2, orderType: 0
                        },
                        {
                            orderField: "OrderByExecutionDate",
                            name: request => request.ExecutionDate ? request.ExecutionDate.toLocaleDateString("ru-RU") : "Не определена",
                            caption: 'Дата исполнения',
                            type: 2,
                            orderType: 0
                        },
                        { name: "ExecutedTemplate", caption: "Исполнено", type: 1 },
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
                        $scope.getModel.OrderByFio = 0;
                        $scope.getModel.PageNumber = 1;
                        for (var i = 0; i < $scope.columns.length; i++) {
                            if ($scope.columns[i].orderType != undefined && $scope.columns[i] != column)
                                $scope.columns[i].orderType = 0;
                        }
                    };

                    for (let colIdx = 0; colIdx < $scope.columns.length; colIdx++) {
                        $scope.$watch(`columns[${colIdx}].orderType`, function (newValue, oldValue) {
                            changeOrderType($scope.columns[colIdx], newValue, oldValue);
                        });
                    }

                    function changeOrderType(column, newValue, oldValue) {
                        if ($scope.stopRefreshList) return;
                        if (newValue != oldValue) {
                            $scope.stopRefreshList = true;
                            $scope.resetOrder(column);
                            if (typeof column.orderField == "string")
                                $scope.getModel[column.orderField] = newValue;
                            $scope.refresh();
                        }
                    }

                    $scope.updateLocalFields = function () {
                        if ($scope.requests == null) return;
                        for (var i = 0; i < $scope.requests.length; i++) {
                            var row = $scope.requests[i];
                            row.IsPrimaryHtml = '<div><input type="checkbox" ng-checked="' + row.IsPrimary + '" disabled></div>';
                            var actionRef = '';
                            actionRef += '<button type="button" title="Редактировать" class="btn btn-default btn-xs" ng-click="actions[0](rows[' + i + '])"><span class="glyphicon glyphicon-pencil"></span></button>';
                            actionRef += '<button type="button" title="Удалить" class="btn btn-default btn-xs" ng-click="actions[1](rows[' + i + '])"><span class="glyphicon glyphicon-remove"></span></button>';
                            row.actions = actionRef;
                            row.ExecutedTemplate = `<input type="checkbox" style="margin-left: 50%; transform: translate(-50%, 0)" ng-model="row.Executed">`
                        }
                    };

                    /**
                     * 
                     * @param {string | null | undefined} date
                     * @returns {Date | null}
                     */
                    const dateStrToDate = date => {
                        if (typeof date === "string") {
                            return new Date(date.split(".").reverse().join("-"));
                        }

                        return null;
                    };

                    $scope.abonentIdToFio = new Map();

                    $scope.loadPromise = { message: 'Загрузка абонентов...' };
                    $scope.refresh = function () {
                        $scope.requests = null;
                        $scope.error = null;

                        $scope.loadPromise.promise = caseService.getRequests($scope.getModel)
                            .success(function (data) {
                                $scope.requests = data.Data;
                                $scope.requests.forEach(req => {
                                    req.IncomingDate = dateStrToDate(req.IncomingDate);
                                    req.ExecutionDate = dateStrToDate(req.ExecutionDate);
                                });
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
                        $scope.getModel.AbonentId = null;
                        $scope.getModel.ExecutorId = null;
                        $scope.getModel.FailureId = null;  
                        $scope.getModel.IncomingDate = null;
                        $scope.getModel.ExecutionDate = null;

                        setTimeout(function () {
                            $('#getmodel-street').val('default');
                            $('.selectpicker').selectpicker('refresh');
                            $scope.$apply();
                        }, 0);
                    };

                    $scope.$watchCollection('[getModel.PageSize, getModel.PageNumber]', function (newValues, oldValues) {
                        if ($scope.requests == null) return;
                        $scope.refresh();
                    });

                    const modelsDescs = [
                        { name: "street", nameProp: "Name" },
                        { name: "executor", nameProp: "Fio" },
                        { name: "abonent", nameProp: "Fio" },
                        { name: "failure", nameProp: "Name" }
                    ];
                    for (const modelsDesc of modelsDescs) {
                        const modelName = modelsDesc.name;
                        const pascalCaseModelName = modelName[0].toUpperCase() + modelName.slice(1);
                        $scope[`get${pascalCaseModelName}s`] = function () {
                            $scope.error = null;
                            return caseService[`get${pascalCaseModelName}Values`]()
                                .success(function (data) {
                                    $scope[modelName + "s"] = data;
                                })
                                .error(function (error) {
                                    $scope.error = 'Ошибка загрузки: ' + error.Message;
                                });
                        };

                        let nameMap = $scope[`${modelName}IdToName`];
                        if (!nameMap) {
                            nameMap = new Map();
                            $scope[`${modelName}IdToName`] = nameMap;
                        }
                    }
                    const getMethods = [...modelsDescs.map(d => d.name).map(m => `get${m[0].toUpperCase() + m.slice(1)}s`).map(m => $scope[m])]


                    $scope.$watch('currentPage', function (newValue, oldValue) {
                        if (newValue == 'request-list') {
                            $q.all([
                                ...getMethods.map(meth => meth())
                            ]).then(function () {
                                $scope.refresh();

                                for (const modelsDesc of modelsDescs) {
                                    const modelName = modelsDesc.name;
                                    const records = $scope[modelName + "s"];

                                    for (let rec of records) {
                                        $scope[`${modelName}IdToName`].set(rec.Id, rec[modelsDesc.nameProp]);
                                    }
                                    
                                }
                            });
                        }
                    });
                }
            };
        }
    ])