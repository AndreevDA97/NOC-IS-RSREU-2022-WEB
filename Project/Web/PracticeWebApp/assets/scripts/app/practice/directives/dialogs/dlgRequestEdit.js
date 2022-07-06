angular.module('app.directives')
    .directive('dlgRequestEdit', ['commonFunctions', 'caseService', '$q',
        function (commonFunctions, caseService, $q) {
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
                        $scope.loadPromise = { message: 'Пожалуйста подождите...' };


                        $scope.loadPromise.promise = $q.all([
                        ]).then(function () {
                        });

                        $scope.loadPromise.promise = $q.all([
                            $scope.getExecutors()
                        ]).then(function () {
                            setTimeout(function () {
                                $(modal + 'ExecutorCD').selectpicker('val', $scope.request.ExecutorCD);
                                $(modal + 'ExecutorCD').selectpicker('refresh');
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
                    ///////////////////////////////////
                    $scope.getExecutors = function () {
                        $scope.error = null;
                        return caseService.getExecutorValues()
                            .success(function (data) {
                                $scope.executors = data;
                            })
                            .error(function (error) {
                                $scope.error = 'Ошибка загрузки: ' + error.Message;
                            });
                    };
                }
            };
        }
    ])