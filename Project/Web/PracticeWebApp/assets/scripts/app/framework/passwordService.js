angular.module('app.services').factory('passwordService', ['$universalService', function ($universalService) {
    return {
        restoreRequest: function (login4Restore, own) {
            return $universalService.putRequest('./api/UserRestorePassword', { Parameter: login4Restore, OwnRestore: own });
        },
        getByCode: function (code) {
            return $universalService.postRequest('./api/UserRestorePassword', { Parameter: code });
        },
        savePassword: function (user) {
            return $universalService.putRequest('./api/ChangePassword', user);
        },
        changePasswordById: function (id) {
            return $universalService.putRequest('./api/RequestChangePasswordById', { Parameter: id });
        },
        
    };
}
]);