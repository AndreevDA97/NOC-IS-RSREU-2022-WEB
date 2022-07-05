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
                    

                    const models = ["executor", "abonent", "failure"];
                    for (const modelName of models) {
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
                    }
                    const getMethods = [...models.map(m => `get${m[0].toUpperCase() + m.slice(1)}s`).map(m => $scope[m])]


                    $scope.$watch('data', function (newValue, oldValue) {
                        if (!newValue) return;
                        $scope.request = $scope.data;
                        if (!$scope.request.Pays)
                            $scope.request.Pays = [];
                        $scope.loadPromise = { message: 'Пожалуйста подождите...' };
                        $scope.loadPromise.promise = $q.all([
                            ...getMethods.map(meth => meth())
                        ]).then(function () {
                            setTimeout(function () {
                                for (const modelName of models) {
                                    const idName = modelName[0].toUpperCase() + modelName.slice(1) + 'Id';
                                    $(modal + idName).selectpicker('val', $scope.data[idName]);
                                    $(modal + idName);
                                }
                                
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

                        var requestDto = $scope.data;
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