angular.module('app.directives')
    .directive('loader', [
    function() {
        return {
            template: '<div>'
                + '    <div class="loader-element loader-element-01"></div>'
                + '    <div class="loader-element loader-element-02"></div>'
                + '    <div class="loader-element loader-element-03"></div>'
                + '    <div class="loader-element loader-element-04"></div>'
                + '    <div class="loader-element loader-element-05"></div>'
                + '    <div class="loader-element loader-element-06"></div>'
                + '    <div class="loader-element loader-element-07"></div>'
                + '    <div class="loader-element loader-element-08"></div>'
                + '</div>',
            restrict: 'E',
            replace: true,
            link: function($scope, element, attrs) {
            }
        };
    }
])