angular.module('app.services').factory('versionFactory', ['$http', function ($http) {
    return {
        version: null,

        get: function () {
            if (this.version == null) {
                this.version = this.getVerApiSync();
            }
            return this.version;
        },
        getVerApiSync: function () {
            var ver = null;
            $.ajax({
                url: './api/VersionNo',
                type: "POST",
                dataType: 'json',
                async: false,
                success: function (data) {
                    ver = data;
                }
            });
            return ver;
        }
    };
}
]);