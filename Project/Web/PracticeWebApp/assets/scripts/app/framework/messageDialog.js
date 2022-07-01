angular.module('app.directives')
    .directive('messageDialog', ['$sce',
        function ($sce) {
        return {
            template: '<div class="modal fade" id="{{iddialog}}" tabindex="-1" role="dialog" aria-hidden="true">'
                + '<div class="modal-dialog">'
                + '    <div class="modal-content">'
                + '        <div class="modal-header">'
                + '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                + '            <h3 class="modal-title">{{dlgheader}}</h3>'
                + '        </div>'
                + '        <div class="modal-body">'
                + '             <div ng-if="htmlMode" ng-bind-html="toTrusted(message)">'
                + '             </div>'
                + '             <div ng-if="!htmlMode" style="word-wrap:break-word;">'
                + '                <p>{{message}}</p>'
                + '             </div>'
                + '             <div ng-if="!htmlMode" ng-repeat="msg in messages">'
                + '                {{msg}}'
                + '             </div>'
                + '             <div class="modal-footer">'
                + '                <button type="button" class="btn btn-default" data-dismiss="modal">'
                + '                    Закрыть'
                + '                </button>'
                + '            </div>'
                + '        </div>'
                + '    </div>'
                + '</div>'
                + '</div>',
            restrict: 'E',
            replace: true,
            scope: {
                iddialog: '=',
                message: '=',
                messages: '=',
                dlgheader: '=',
                htmlMode: '=',
                yesCallback: '=yescallback',
            },
            link: function ($scope, element, attrs) {
                $scope.header = 'Внимание!';
                $scope.toTrusted = function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                }
            }
        };
    }
])