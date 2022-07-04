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
                            $scope.getStreets()
                        ]).then(function () {
                            setTimeout(function () {
                                $(modal + 'StreetId').selectpicker('val', $scope.request.StreetId);
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