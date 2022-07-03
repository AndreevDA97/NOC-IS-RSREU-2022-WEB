angular.module('app.directives')
    .directive('dlgRequestEdit', ['commonFunctions', 'caseService', 'organizationsService', '$q',
        function (commonFunctions, caseService, organizationsService, $q) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/dialogs/dlg-request-edit.html',
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=',
                    action: '=',
                    callback: '=',
                },
                link: function ($scope, element, attrs) {
                    var modal = '#dlg-request-edit';
                    $scope.iddialog = modal.slice(1);

                    $scope.close = function () { $(modal).modal('hide'); };
                    $scope.$watch('data', function (newValue, oldValue) {
                        if (!newValue) return;
                        $scope.request = $scope.data;
                        if (!$scope.request.Pays)
                            $scope.request.Pays = [];
                        $scope.loadPromise = { message: 'Пожалуйста подождите...' };
                        $scope.loadPromise.promise = $q.all([
                            $scope.getAbonents()
                        ]).then(function () {
                            setTimeout(function () {
                                $(modal + 'AccountId').selectpicker('val', $scope.request.AccountId);
                                $(modal + 'AccountId').selectpicker('refresh');
                            }, 0);
                        });
                        setTimeout(function () {
                            $(modal + ' .selectpicker').selectpicker();
                            $(modal + ' .selectpicker').selectpicker('refresh');
                            // исправление от неполного затемнения фона модального окна
                            $(modal).on('scroll', fixModalBackdrop);
                            $(modal + ' .div-collapse-light').on('shown.bs.collapse', fixModalBackdrop);
                            $(modal + ' .div-collapse-light').on('hidden.bs.collapse', fixModalBackdrop);
                            function fixModalBackdrop() { $(modal).data('bs.modal').handleUpdate(); }
                        }, 0);
                    });

                    $scope.getAbonents = function () {
                        $scope.error = null;
                        return caseService.getAbonentValues()
                            .success(function (data) {
                                $scope.abonents = data;
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка загрузки: ' + error.Message;
                            });
                    };

                    //$scope.$watchCollection('request.Pays', function (newVal, oldVal) {
                    //    if (!newVal || newVal.length == 0) return;
                    //    updateViewPays();
                    //});
                    //function updateViewPays() {
                    //    setTimeout(function () {
                    //        $(modal + ' #requestpays .selectpicker').selectpicker();
                    //        angular.forEach($scope.request.Pays, function (item, index) {
                    //            $(modal + 'ServiceId' + index).selectpicker('val', item.ServiceId);
                    //        });
                    //        $(modal + ' #requestpays .selectpicker').selectpicker('refresh');
                    //    }, 0);
                    //};
                    //$scope.addPay = function (serviceId) {
                    //    $scope.request.Pays.push({
                    //        ServiceId: serviceId
                    //    });
                    //};
                    //$scope.deletePay = function (serviceId) {
                    //    for (var i = 0; i < $scope.request.Pays.length; i++)
                    //        if ($scope.request.Pays[i].ServiceId == serviceId) {
                    //            $scope.request.Pays.splice(i, 1);
                    //            i--;
                    //        }
                    //    setTimeout(function () {
                    //        $(modal).modal("handleUpdate");
                    //    }, 100);
                    //};
                    //$scope.deletePay = function (row) {
                    //    var index = $scope.request.Pays.indexOf(row);
                    //    if (index !== -1) $scope.request.Pays.splice(index, 1);
                    //};

                    $scope.submit = function () {
                        $scope.error = null;

                        var requestDto = $scope.request;
                        var requestId = $scope.action == 'edit' ? requestDto.Id : null;
                        $scope.loadPromise = { message: 'Выполнение операции...' };
                        $scope.loadPromise.promise = caseService.saveRequest(requestId, requestDto)
                            .success(function () {
                                if (typeof $scope.callback === 'function') $scope.callback();
                                $scope.close();
                            })
                            .error(function (error) {
                                $scope.error = 'Произошла ошибка: ' + error.Message;
                            });
                    };
                }
            };
        }
    ])