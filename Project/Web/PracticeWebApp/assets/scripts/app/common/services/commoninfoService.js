angular.module('app.services').factory('commoninfoService', ['$universalService', function ($universalService) {
    return {
        getProjectNews: function (model) {
            return $universalService.postRequest('./api/ProjectNews', model);
        },

    };
}
]);