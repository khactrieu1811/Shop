(function (app) {
    app.controller('rootController', rootController);

    rootController.$inject = ['$scope', '$state']

    function rootController($scope, $state) {
        $scope.logout = function () {
            $state.go('login');
        }
        //$scope.authentication = authData.authenticationData;
        //authencationService.validateRequest();
    }
})(angular.module('tedushop'))