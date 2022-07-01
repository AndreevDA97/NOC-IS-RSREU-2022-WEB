angular.module('app.directives')
    .directive('confirmDialog', [
    function() {
        return {
            template: '<div class="modal fade" id="{{iddialog}}" tabindex="-1" role="dialog" aria-hidden="true">'
                + '<div class="modal-dialog">'
                + '    <div class="modal-content">'
                + '        <div class="modal-header">'
                + '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                + '            <h3 class="modal-title">Внимание!</h3>'
                + '        </div>'
                + '        <div class="modal-body">'
                + '            <div>'
                + '                {{message}}'
                + '            </div>'
                + '            <div class="modal-footer">'
                + '                <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="yesCallback()">Да</button>'
                + '                <button type="button" class="btn btn-default" data-dismiss="modal">'
                + '                    Нет'
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
                yesCallback: '=yescallback',
            },
            link: function($scope, element, attrs) {

            }
        };
    }
])