angular.module('app.controllers')
    .controller('frameworkDemoCtrl', ['$scope', 'commonFunctions', '$filter', '$q', '$location',
        function ($scope, commonFunctions, $filter, $q, $location) {
            // можно задать id страницы
            // (удобно для поиска компонентов)
            var page = '#framework-demo';
            $scope.page = page.slice(1);

            $scope.percent = 0; // имитация процесса загрузки
            $scope.startPercentTimer = function () {
                $scope.percent += 5;
                $scope.$apply();
                if ($scope.percent != 100)
                    setTimeout($scope.startPercentTimer, 850);
            }

            // регистрация сворачивающихся панелей на странице
            $scope.registerCollapsePanels = function () {
                setTimeout(function () {
                    $(page + ' .panel').on('show.bs.collapse hide.bs.collapse',
                        function (event) {
                            var panelBody = $(event.target);
                            var spanElement = panelBody.parent().children('.panel-heading')
                                .children('span.glyphicon-chevron-up, span.glyphicon-chevron-down');
                            if (spanElement) {
                                spanElement.removeClass();
                                spanElement.addClass(event.type == 'show'
                                    ? 'glyphicon glyphicon-chevron-up'
                                    : 'glyphicon glyphicon-chevron-down');
                            }
                        }
                    );
                }, 0);
            };

            // инициализировать визуальные компоненты
            commonFunctions.refreshEditorStyles();
            $scope.registerCollapsePanels();

            // примеры исправления багов
            setTimeout(function () {
                var datepicker = $('.datepicker').datepicker('update');
                // предотвратить баг вызова события открытия окна
                datepicker.on('show.bs.modal', function (event) {
                    event.stopPropagation();
                });
                // исправление от неполного затемнения фона модального окна
                $(modal).on('scroll', fixModalBackdrop);
                $(modal + ' .div-collapse-light').on('shown.bs.collapse', fixModalBackdrop);
                $(modal + ' .div-collapse-light').on('hidden.bs.collapse', fixModalBackdrop);
                function fixModalBackdrop() { $(modal).data('bs.modal').handleUpdate(); }
                // формат ввода с точкой
                $('.curency').unbind('keyup');
                $('.curency').keyup(function () {
                    if ($(this).val() && $(this).val().indexOf(",")) {
                        $(this).val($(this).val().replace(/[,]/g, "."))
                            .trigger('change'); // update scope
                    }
                });
            }, 100);
        }
    ]);