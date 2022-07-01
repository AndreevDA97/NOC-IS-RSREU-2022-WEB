angular.module('app.services').factory('organizationsService', ['$universalService', 'commonFunctions', function ($universalService, commonFunctions) {
    return {
        //Продукты
        getProducts: function () {
            return $universalService.postRequest('./api/Products', null);
        },
        //Организации
        getOrganizations: function (getModel) {
            return $universalService.postRequest('./api/OrganizationList', getModel);
        },
        getOrganization: function (id) {
            return this.getOrganizations({ Id: id, FullInfo: true, });
        },
        getGisGkhIds: function (id, withSave) {
            return $universalService.postRequest('./api/OrganizationGisInfo', {Parameter: id, WithSave: withSave});
        },
        getGisGkhProviders: function (extId, unloadedGis) {
            return $universalService.getRequest('./api/OrganizationGisInfo?extId=${extId}&unloadedGis=${unloadedGis}');
        },
        getOrganizationSpendTime: function () {
            return $universalService.getRequest('./api/OrganizationSpendTime');
        },
        getOrganizations4Select: function (epsId) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                MapName: true,
                ExternalPaySystemId: epsId,
            };
            return this.getOrganizations(model);
        },
        getAgents4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                MapName: true,
                AgentOnly: true,
            };
            return this.getOrganizations(model);
        },
        getGisOrganization4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                MapName: true,
                GisOnly: true,
            };
            return this.getOrganizations(model);
        },
        getGisSystems4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                GisOnly: true,
                //SystemTypes: [1],
            };
            return this.getExternalSystems(model);
        },

        putOrganization: function (object) {
            return $universalService.putRequest('./api/OrganizationList', object);
        },
        deleteOrganization: function (id) {
            return $universalService.deleteObjectRequest('./api/OrganizationList', { Id: id });
        },
        getOrganizationLogo: function (id) {
            return $universalService.postRequest('./api/OrganizationLogo', {OrganizationId: id});
        },
        putOrganizationLogo: function (id, logo) {
            return $universalService.putRequest('./api/OrganizationLogo', { OrganizationId: id, Base64Logo: logo, });
        },
        //Хранилища
        getDws: function (getModel) {
            return $universalService.postRequest('./api/DwList', getModel);
        },
        getDws4Select: function (userList) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                UserIdList: userList,
            };
            return $universalService.postRequest('./api/DwList', model);
        },
        putDw: function (object) {
            return $universalService.putRequest('./api/DwList', object);
        },
        deleteDw: function (id) {
            return $universalService.deleteObjectRequest('./api/DwList', { Id: id });
        },
        //Агентская информация
        getAgent: function (organizationId) {
            return $universalService.postRequest('./api/Agent', { Id: organizationId, });
        },
        putAgent: function (organization) {
            return $universalService.putRequest('./api/Agent', organization);
        },
        //Сертификат
        getCertificate: function (document, id, successCallBack, errorCallBack) {
            commonFunctions.downloadFile('./api/AgentCertificate?organizationId=' + id, successCallBack, errorCallBack);
        },
        createCertificate: function (model) {
            return $universalService.putRequest('./api/AgentCertificate', model);
        },
        dropCertificate: function (model) {
            return $universalService.deleteObjectRequest('./api/AgentCertificate', model);
        },
        //Пользователи
        getUsers: function (getModel) {
            return $universalService.postRequest('./api/UserList', getModel);
        },
        putUser: function (user) {
            return $universalService.putRequest('./api/UserList', user);
        },
        deleteUser: function (user) {
            return $universalService.deleteObjectRequest('./api/UserList', user);
        },
        getUsers4Select: function (orgId) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                OrganizationId: orgId,
            };
            return this.getUsers(model);
        },
        getOnlyAdminUsers : function() {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                IsAdmin: true,
            };
            return this.getUsers(model);
        },

        //Внешние системы
        getSystemTypes: function () {
            return $universalService.postRequest('./api/ExternalSystemTypeList');
        },
        getExternalSystems: function (getModel) {
            return $universalService.postRequest('./api/ExternalSystemList', getModel);
        },
        getExternalSystem: function (id) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                Id: id,
                WithExtendedInfo: true,
            };
            return this.getExternalSystems(model);
        },
        getExternalSystems4Select: function (systemTypes, withAccess, orgId) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                SystemTypes: systemTypes,
                SystemsWithAccess: withAccess,
                OrganizationId: orgId,
            };
            return this.getExternalSystems(model);
        },
        getExternalSystems4SelectExternalChanges: function (systemTypes) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                SystemTypes: systemTypes,
                SystemsWithAccess: false,
                WithOnlineExchange: true,
            };
            return this.getExternalSystems(model);
        },
                putExternalSystem: function (system) {
            return $universalService.putRequest('./api/ExternalSystemList', system);
        },
        deleteExternalSystem: function (id) {
            return $universalService.deleteObjectRequest('./api/ExternalSystemList', { Id: id });
        },
        refreshBufferSystem: function (id) {
            return $universalService.putRequest('./api/UpdateAccountInfoChangesSystem', { Parameter: id });
        },
        getEpsList: function (withStatistic) {
            return this.getOwnEpsList(withStatistic, false);
        },
        getOwnEpsList: function (withStatistic, own) {
            return $universalService.postRequest('./api/EpsList/?withStatistic=' + withStatistic + '&own=' + own);
        },
        //Платежные документы
        getPaydocs: function (getModel) {
            return $universalService.postRequest('./api/Paydoc/List', getModel);
        },
        putPaydoc: function (paydoc) {
            return $universalService.putRequest('./api/Paydoc', paydoc);
        },
        deletePaydoc: function (id) {
            return $universalService.deleteRequest('./api/Paydoc/delete/' + id.toString(), id);
        },
        //Перекодировка провайдеров
        getEpsRecode: function (getModel) {
            return $universalService.postRequest('./api/EpsToProviderRecodeList', getModel);
        },
        putEpsRecode: function (recode) {
            return $universalService.putRequest('./api/EpsToProviderRecodeList', recode);
        },
        deleteEpsRecode: function (recode) {
            return $universalService.deleteObjectRequest('./api/EpsToProviderRecodeList', recode);
        },
        //Правила проверки подключений
        getEpsCheckRule: function (getModel) {
            return $universalService.postRequest('./api/EpsCheckRules', getModel);
        },
        putEpsCheckRule: function (item) {
            return $universalService.putRequest('./api/EpsCheckRules', item);
        },
        deleteEpsCheckRule: function (item) {
            return $universalService.deleteObjectRequest('./api/EpsCheckRules', item);
        },
        runEpsCheckRule: function (item) {
            return $universalService.postRequest('./api/EpsCheckRules/run', item);
        },
        //Типы л/сч
        getAccountTypes: function (getModel) {
            return $universalService.postRequest('./api/AccountTypeList', getModel);
        },
        getAccountTypes4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
            };
            return this.getAccountTypes(model);
        },
        putAccountType: function (accountType) {
            return $universalService.putRequest('./api/AccountTypeList', accountType);
        },
        deleteAccountType: function (id) {
            return $universalService.deleteObjectRequest('./api/AccountTypeList', { Id: id });
        },
        //Регионы
        getRegions: function (getModel) {
            return $universalService.postRequest('./api/RegionList', getModel);
        },
        getRegions4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
            };
            return this.getRegions(model);
        },
        putRegion: function (accountType) {
            return $universalService.putRequest('./api/RegionList', accountType);
        },
        deleteRegion: function (id) {
            return $universalService.deleteObjectRequest('./api/RegionList', { Id: id });
        },
        getDistricts: function (getModel) {
            return $universalService.postRequest('./api/DistrictList', getModel);
        },
        getDistricts4Select: function () {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
            };
            return this.getDistricts(model);
        },
        getRegionDistricts: function (epsId) {
            return epsId
                ? $universalService.postRequest('./api/RegionDistricts?epsId=' + epsId)
                : $universalService.getRequest('./api/RegionDistricts');
        },
        //Команды
        getCommands: function (getModel) {
            return $universalService.postRequest('./api/CommandList', getModel);
        },
        getCommand: function (id) {
            return this.getCommands({Id: id, FullInfo: true,});
        },
        setInworkCommand: function (id, inWork) {
            return $universalService.postRequest('./api/InWorkCommand', { EpsCommandId: id, InWork: inWork, });
        },
        getCommandFile: function (document, command, successCallBack, errorCallBack) {
            commonFunctions.downloadFile('./api/CommandFile?id=' + command.EpsCommandId, successCallBack, errorCallBack, command);
        },
        putCommand: function (command) {
            return $universalService.putRequest('./api/CommandList', command);
        },
        deleteCommand: function (id) {
            return $universalService.deleteObjectRequest('./api/CommandList', { EpsCommandId: id });
        },
        commandTypes: function () {
            var result = [];
            result.push({ Id: 0, Name: 'Информационное сообщение', });
            result.push({ Id: 1, Name: 'Установить пакет обновления', });
            result.push({ Id: 2, Name: 'Выполнить SQL-скрипт', });
            result.push({ Id: 3, Name: 'Выполнить запрос и вернуть результат', });
            return result;
        },
        commandStatuses: function () {
            var result = [];
            result.push({ Id: 0, Name: 'Неизвестен', });
            result.push({ Id: 1, Name: 'Успешно', });
            result.push({ Id: 2, Name: 'Ошибка', });
            return result;
        },
        getUploadedFiles: function (model) {
            return $universalService.postRequest('./api/EpsUploadedFiles', model);
        },
        getOrgStatuses: function () {
            return $universalService.postRequest('./api/OrganizationStatuses');
        },
        sendMessage: function(model) {
            return $universalService.postRequest('./api/SendMessage', model);
        },
        //Регионы
        getRegionDistrictsByRegionId: function (regionId) {
            return $universalService.getRequest('./api/RegionDistricts?regionId=' + regionId);
        },
        //CSystemDatabases
        getCSystemDatabases: function(model) {
            return $universalService.postRequest('./api/CSystemDatabaseManagment/GetCSystemDatabases', model);
        },
        deleteCSystemDatabase: function(id) {
            return $universalService.getRequest('./api/CSystemDatabaseManagment/DeleteDatabase/' + id);
        },
        //copyBackupToEtalon: function(id) {
        //    return $universalService.getRequest('./api/CSystemDatabaseManagment/CopyBackupToEtalon/' + id);
        //},
        //extractOnEtalon: function(id) {
        //    return $universalService.getRequest('./api/CSystemDatabaseManagment/ExtractOnEtalon/' + id);
        //},
        //restoreDatabase: function(id) {
        //    return $universalService.getRequest('./api/CSystemDatabaseManagment/RestoreDatabase/' + id);
        //}
        runNextOperaion: function (id, params) {
            return $universalService.getRequest('./api/CSystemDatabaseManagment/RunNextOperaion/' + id, { params: params });
        },
        getOperationTypes: function () {
            return $universalService.getRequest('./api/CSystemDatabaseManagment/OperationTypes/');
        },
        //Услуги
        getPaymentDestinations: function (epsId) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                PageNumber: 1,
                OrderByName: 1,
                OwnPaymentDestination: true,
                ExternalSystemId: epsId
            };
            return $universalService.postRequest('./api/PaymentDestinationList', model);
        },
        getPaymentDestinationsAutocomplete: function (own, systemId, contains) {
            var model = {
                PageSize: 10,
                PageNumber: 1,
                OrderByName: 1,
                OwnPaymentDestination: own,
                ExternalSystemId: systemId,
                NameOrOrgContains: contains
            };
            return $universalService.postRequest('./api/PaymentDestinationList', model);
        },
        getAgentsAutocomplete: function (contains) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                NameContains: contains,
                PageNumber: 1,
                OrderByName: 1,
                MapName: true,
                AgentOnly: true,
            };
            return this.getOrganizations(model);
        },
        getOrganizationsAutocomplete: function (contains) {
            var model = {
                PageSize: commonFunctions.maxPageSize(),
                NameContains: contains,
                PageNumber: 1,
                OrderByName: 1,
                MapName: true,
                AgentOnly: false,
            };
            return this.getOrganizations(model);
        },
    };
}
]);