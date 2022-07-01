angular.module('app.directives')
    .directive('showHtml', [
        '$compile', function($compile) {
            return {
                scope: true,
                link: function(scope, element, attrs) {
                    var el;
                    attrs.$observe('template', function(tpl) {
                        if (angular.isDefined(tpl)) {
                            // compile the provided template against the current scope
                            el = $compile(tpl)(scope);
                            // stupid way of emptying the element
                            element.html("");
                            // add the template content
                            element.append(el);
                        }
                    });
                }
            };
        }
    ]);

angular.module('app.directives')
    .directive('datatable', [
        '$sce', '$filter',
        function ($sce, $filter) {
            return {
                template: '<div> '
                    + '    <table style="{{tableStyle}}" class="table table-bordered table-hover">'
                    + '        <thead>'
                    + '            <tr>'
                    + '                <td ng-repeat ="col in columns" ng-show="!col.hidden" style="{{col.style}}">'
                    + '                    <div ng-show="col.orderType != undefined" type="button" class="btn-sort" ng-click="setOrderBy(col)"><span class="glyphicon"'
                    + '            ng-class="{\'glyphicon-sort\': (col.orderType == 0), \'glyphicon-sort-by-alphabet\': (col.orderType == 1), \'glyphicon-sort-by-alphabet-alt\': (col.orderType == -1)}"></span></div>'
                    + '                    <div ng-show="col.captionHtml" show-html template="{{col.captionHtml}}"></div>'
                    + '			   <button ng-show="col.checked != undefined" type="button" class="btn-check" ng-click="setChecked(col)"><span class="glyphicon" ng-class="{\'glyphicon-check\': (col.checked), \'glyphicon-unchecked\': (!col.checked),}"></span></button> '
                    + '{{col.caption}}'
                    + '</td>'
                    + '</tr>'
                    + '</thead>'
                    + '<tbody>'
                    + '<tr ng-if="builtInOrdering" ng-repeat="row in rows| orderBy:orderPredicateCalc:orderReverse" ng-show="!row[\'rowHidden\']" ng-class="row[\'rowClass\']" ng-style="row[\'rowStyle\']">'
                    + '    <td ng-repeat="col in columns" ng-show="!col.hidden">'
                    + '                    <div ng-if="(!col.type || (col.type == 0)) && !col.format" ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{row[col.name]}}</div>'
                    + '                    <div ng-if="(!col.type || (col.type == 0)) && (col.format == \'date\')"  ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{row[col.name] | date: \'dd.MM.yyyy\' }}</div>'
                    + '                    <div ng-if="(col.type == 1)" show-html template="{{row[col.name]}}" ng-show="!col.hiddenRow  || !col.hiddenRow(row)"></div>'
                    + '                    <div ng-if="(col.type == 2)" ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{col.name(row)}}</div>'
                    + '    </td>'
                    + '</tr>'
                    + '<tr ng-if="!builtInOrdering" ng-repeat="row in rows" ng-show="!row[\'rowHidden\']" ng-class="row[\'rowClass\']" ng-style="row[\'rowStyle\']">'
                    + '    <td ng-repeat="col in columns" ng-show="!col.hidden">'
                    + '                    <div ng-if="(!col.type || (col.type == 0)) && !col.format" ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{row[col.name]}}</div>'
                    + '                    <div ng-if="(!col.type || (col.type == 0)) && col.format && (col.format != \'date\')"  ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{formating(col.name(row), col.format, col.formatExpression)}}</div>'
                    + '                    <div ng-if="(!col.type || (col.type == 0)) && (col.format == \'date\')"  ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{row[col.name] | date: \'dd.MM.yyyy\' }}</div>'
                    + '                    <div ng-if="(col.type == 1)" show-html template="{{row[col.name]}}" ng-show="!col.hiddenRow  || !col.hiddenRow(row)"></div>'
                    + '                    <div ng-if="(col.type == 2) && !col.format" ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{col.name(row)}}</div>'
                    + '                    <div ng-if="(col.type == 2) && col.format" ng-show="!col.hiddenRow  || !col.hiddenRow(row)">{{formating(col.name(row), col.format, col.formatExpression)}}</div>'
                    + '    </td>'
                    + '</tr>'
                    + '</tbody>'
                    + '</table>'
                    + '<div ng-show="!rows || rows.length == 0">'
                    + '<div class="alert alert-default text-align-center"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;Нет данных</div>'
                    + '</tr>'
                    + '</div>',
                restrict: 'E',
                replace: true,
                scope: {
                    columns: '=columns',
                    rows: '=rows',
                    actions: '=actions',
                    builtInOrdering: '=builtinordering',
                    tableStyle: '=tableStyle'
                },
                link: function($scope, element, attrs) {
                    $scope.toTrusted = function(htmlCode) {
                        return $sce.trustAsHtml(htmlCode);
                    }
                    $scope.formating = function (value, formatName, formatExpression) {
                        return $filter(formatName)(value, formatExpression);
                    }
                    $scope.orderPredicate = '';
                    $scope.orderReverse = false;

                    $scope.orderPredicateCalc = function (row) {
                        //Хитросложная сортировка с плавающими приоритетами (приоритеты от 0 до 9)
                        if (!$scope.orderPredicate) return null;
                        if (row.preOrder) {
                            var preOrder = 0;
                            preOrder = row.preOrder;
                            if ($scope.orderReverse)
                                preOrder = 9 - preOrder;
                            preOrder = preOrder + "_";
                            //console.log($scope.orderPredicate(row));
                            if ($.isFunction($scope.orderPredicate))
                                return preOrder + $scope.orderPredicate(row);
                            else
                                return preOrder + row[$scope.orderPredicate];
                        }
                        //console.log($scope.orderPredicate(row));
                        if ($.isFunction($scope.orderPredicate))
                            return $scope.orderPredicate(row);
                        else
                            return row[$scope.orderPredicate];
                    };

                    $scope.setOrderBy = function(column) {
                        if (column.orderType == 0) {
                            column.orderType = 1;
                        } else if (column.orderType == 1) {
                            column.orderType = -1;
                        } else if (column.orderType == -1) {
                            column.orderType = 0;
                        }
                        if ($scope.builtInOrdering) {
                            for (var i = 0; i < $scope.columns.length; i++) {
                                if ($scope.columns[i].orderType == undefined) continue;
                                if (($scope.columns[i].orderType != 0) && ($scope.columns[i] != column))
                                    $scope.columns[i].orderType = 0;
                            }
                            $scope.orderPredicate = column.orderType == 0 ? '' : (column.orderFieldName ? column.orderFieldName : column.name);
                            $scope.orderReverse = column.orderType < 0;
                        }
                    }
                    $scope.setChecked = function (column) {
                        column.checked = !column.checked;
                    }

                }
            };
        }
    ]);