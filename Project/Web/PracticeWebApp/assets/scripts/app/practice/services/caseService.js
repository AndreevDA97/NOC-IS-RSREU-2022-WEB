angular.module('app.services').factory('caseService', ['$http', '$universalService', 'commonFunctions', '$timeout', '$filter',
    function ($http, $universalService, commonFunctions, $timeout, $filter) {
        var mainScope = {};
        return {
            getMainScope: function () {
                return mainScope;
            },
            getErrorMsg: function (error) {
                if (error && angular.isObject(error.data)) error = error.data;
                return error.FileError || error.ExceptionMessage || error.Message || error;
            },
            // AbonentListController
            getAbonents: function (model) {
                return $universalService.postRequest('./api/Practice/AbonentList', model);
            },
            getAbonentValues: function () {
                return $universalService.postRequest('./api/Practice/AbonentList4Select');
            },
            saveAbonent: function (abonentId, abonentDto) {
                return $universalService.putRequest('./api/Practice/AbonentList/' + abonentId, abonentDto);
            },
            deleteAbonent: function (abonentId) {
                return $universalService.deleteRequest('./api/Practice/AbonentList/' + abonentId);
            },
            // StreetListController
            getStreets: function (model) {
                return $universalService.postRequest('./api/Practice/StreetList', model);
            },
            saveStreet: function (streetId, streetDto) {
                return $universalService.putRequest('./api/Practice/StreetList/' + streetId, streetDto);
            },
            deleteStreet: function (streetId) {
                return $universalService.deleteRequest('./api/Practice/StreetList/' + streetId);
            },
            getStreetValues: function () {
                return $universalService.postRequest('./api/Practice/StreetList4Select');
            },
            // RequestListController
            getRequests: function (model) {
                 return $universalService.postRequest('./api/Practice/RequestList', model);
            },
            saveRequest: function (requestId, requestDto) {
                return $universalService.putRequest('./api/Practice/RequestList/' + requestId, requestDto);
            },
            deleteRequest: function (requestId) {
                return $universalService.deleteRequest('./api/Practice/RequestList/' + requestId);
            },
            getRequestValues: function () {
                return $universalService.postRequest('./api/Practice/RequestList4Select');
            },
            // FailureListController
            getFailureValues: function () {
                return $universalService.postRequest('./api/Practice/FailureList4Select');
            },
            // ExecutorListController
            getFailureValues: function () {
                return $universalService.postRequest('./api/Practice/FailureList4Select');
            }
        };
    }]);