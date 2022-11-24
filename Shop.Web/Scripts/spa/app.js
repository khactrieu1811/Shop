/// <reference path="../plugins/angular/angular.js" />
//khởi tạo module
var myApp = angular.module('myModule', []);

// khởi tạo controller
// kết nổi controller vs module
myApp.controller("schoolController", schoolController);
myApp.service("validatorService", validatorService);
myApp.directive("shopDirective", shopDirective);

schoolController.$inject = ['$scope', 'validatorService']

function schoolController($scope, validatorService) {

    $scope.checkNumber = function() {
        $scope.message = validatorService.checkNumber(2);
    }
    $scope.num = 1;
}

function validatorService($window) {
    return {
        checkNumber: checkNumber
    }
    function checkNumber(input) {
        if (input % 2) {
            return 'this is even';
        } else
            return 'this is odd';
    }
}
function shopDirective() {
    return {
        templateUrl : "/Scripts/spa/shopDirective.html"
    }
}