angular.module('app.controllers').controller('appCtrl', ['$scope', '$location', '$route', '$rootScope',
    function ($scope, $location, $route, $rootScope) {

        $scope.goTo = function (loc) {
            $location.path(loc);
        };

        $scope.$on('$locationChangeStart', function (event, nextUrl, currentUrl) {
            /*
            if ($location.path() != '/test' || nextUrl.indexOf('test') == -1) {
                if (true) {
                    event.preventDefault();
                    $location.path('/test');
                }
            }
            */
        });

        $scope.goToWithReload = function (loc) {
            if (loc != $location.$$path) {
                $scope.goTo(loc);
            } else {
                $route.reload();
            }
        };

        $rootScope.returnToEdit = undefined;

        $scope.setCookie = function (name, value, options) {
            options = options || {};

            var expires = options.expires;

            if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for (var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        };

        $scope.deleteCookie = function (name) {
            $scope.setCookie(name, null, { expires: -1 });
        };

        $scope.getCookie = function (name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        $scope.closePopup = function () {
            $rootScope.popupClosed = true;
        };

        JSON.stringifySafe = (obj, indent = 2) => {
            let cache = [];
            const retVal = JSON.stringify(
                obj,
                (key, value) =>
                    typeof value === "object" && value !== null
                        ? cache.includes(value)
                            ? undefined // Duplicate reference found, discard key
                            : cache.push(value) && value // Store value in our collection
                        : value,
                indent
            );
            cache = null;
            return retVal;
        };
    }
]);