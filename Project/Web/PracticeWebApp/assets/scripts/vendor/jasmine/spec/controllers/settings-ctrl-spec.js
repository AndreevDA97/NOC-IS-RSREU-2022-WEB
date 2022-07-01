describe('Settings Controller:', function () {

    var controller, scope, factory;
    
    beforeEach(module('ngRoute'));
    beforeEach(module('oi.file'));
    beforeEach(module('ngCookies'));
    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope, $injector) {
        scope = $rootScope.$new();
        factory = $injector.get('settingsFactory');
        controller = $controller('settingsCtrl', {
            $scope: scope,
            settingsFactory: {}
        });
    }));


    describe('Test inject:', function () {
        
        it("checks injecting of settings controller", function () {
            expect(true).toBe(true);
        });
        
    });
    
});