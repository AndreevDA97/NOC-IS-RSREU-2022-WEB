angular.module('app.directives')
    .directive('circularPercentageBar', [
    function () {
        return {
            template: '<div>'
                + '    <div class="c100 {{classset}}" ng-class="getClassObj()">'
                + '        <span>{{percent}}%</span>'
                + '        <div class="slice">'
                + '            <div class="bar"></div>'
                + '            <div class="fill"></div>'
                + '        </div>'
                + '    </div>'
                + '</div>',
            restrict: 'E',
            replace: true,
            scope: {
                percent: '=',
                classset: '=',
                autocolor: '='
            },
            link: function ($scope, element, attrs) {
                $scope.getClassObj = function () {
                    var result = {};
                    $scope.percent = parseInt($scope.percent);
                    result['p' + $scope.percent] = true;
                    if ($scope.autocolor == true && $scope.percent) {
                        if ($scope.percent < 35)
                            result['danger'] = true;
                        else if ($scope.percent < 75)
                            result['warning'] = true;
                        else if ($scope.percent < 100)
                            result['primary'] = true;
                        else
                            result['success'] = true;
                    }
                    return result;
                };
            }
        };
    }
]);