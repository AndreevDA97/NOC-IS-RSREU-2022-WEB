angular.module('app.directives')
    .directive('dlgAbonentEdit', ['commonFunctions', 'caseService', 'organizationsService', '$q',
        function (commonFunctions, caseService, organizationsService, $q) {
            return {
                templateUrl: './assets/scripts/app/practice/directives/dialogs/dlg-abonent-edit.html',
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=',
                    action: '=',
                    callback: '=',
                },
                link: function ($scope, element, attrs) {
                    var modal = '#dlg-abonent-edit';
                    $scope.iddialog = modal.slice(1);

                    $scope.close = function () { $(modal).modal('hide'); };
                    $scope.$watch('data', function (newValue, oldValue) {
                        if (!newValue) return;
                        $scope.abonent = $scope.data;
                        if (!$scope.abonent.Pays)
                            $scope.abonent.Pays = [];
                        $scope.loadPromise = { message: 'Пожалуйста подождите...' };
                        $scope.loadPromise.promise = $q.all([
                            $scope.getStreets()
                        ]).then(function () {
                            setTimeout(function () {
                                $(modal + 'StreetId').selectpicker('val', $scope.abonent.StreetId);
                                $(modal + 'StreetId').selectpicker('refresh');
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

                    //$scope.$watchCollection('abonent.Pays', function (newVal, oldVal) {
                    //    if (!newVal || newVal.length == 0) return;
                    //    updateViewPays();
                    //});
                    //function updateViewPays() {
                    //    setTimeout(function () {
                    //        $(modal + ' #abonentpays .selectpicker').selectpicker();
                    //        angular.forEach($scope.abonent.Pays, function (item, index) {
                    //            $(modal + 'ServiceId' + index).selectpicker('val', item.ServiceId);
                    //        });
                    //        $(modal + ' #abonentpays .selectpicker').selectpicker('refresh');
                    //    }, 0);
                    //};
                    //$scope.addPay = function (serviceId) {
                    //    $scope.abonent.Pays.push({
                    //        ServiceId: serviceId
                    //    });
                    //};
                    //$scope.deletePay = function (serviceId) {
                    //    for (var i = 0; i < $scope.abonent.Pays.length; i++)
                    //        if ($scope.abonent.Pays[i].ServiceId == serviceId) {
                    //            $scope.abonent.Pays.splice(i, 1);
                    //            i--;
                    //        }
                    //    setTimeout(function () {
                    //        $(modal).modal("handleUpdate");
                    //    }, 100);
                    //};
                    //$scope.deletePay = function (row) {
                    //    var index = $scope.abonent.Pays.indexOf(row);
                    //    if (index !== -1) $scope.abonent.Pays.splice(index, 1);
                    //};

                    $scope.submit = function () {
                        $scope.error = null;

                        var abonentDto = $scope.abonent;
                        var abonentId = $scope.action == 'edit' ? abonentDto.Id : null;
                        $scope.loadPromise = { message: 'Выполнение операции...' };
                        $scope.loadPromise.promise = caseService.saveAbonent(abonentId, abonentDto)
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