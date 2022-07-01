angular.module('app.services').factory('organizationService', ['$universalService', 'commonFunctions', function ($universalService, commonFunctions) {
    return {
        getCurrentOrganization: function () {
            return $universalService.postRequest('./api/CurrentOrganization');
        },
        getCurrentGisGkhIds: function () {
            return $universalService.postRequest('./api/OrganizationGisInfo', { Parameter: -1 });
        },
        putCurrentOrganization: function (organization) {
            return $universalService.putRequest('./api/CurrentOrganization', organization);
        },
        getCurrentAgent: function () {
            return $universalService.postRequest('./api/CurrentAgent');
        },

        putCurrentAgent: function (agent) {
            return $universalService.putRequest('./api/CurrentAgent', agent);
        },
        getServicesTypes: function() {
            return $universalService.getRequest('./api/services/types');
        },
        getServicesTypesByOrganization: function (orgId) {
            return $universalService.getRequest('./api/services/types/organization/' + orgId);
        },
        getAccountPreparationStatus: function() {
            return $universalService.postRequest('./api/AccountPreparationInfo/maininfo');
        },
        //Сертификат
        getCertificate: function (document, successCallBack, errorCallBack) {
            commonFunctions.downloadFile('./api/PortalAgentCertificate', successCallBack, errorCallBack);
        },
    };
}
]);