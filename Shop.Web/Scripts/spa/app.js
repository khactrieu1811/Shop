/// <reference path="../plugins/angular/angular.js" />
//khởi tạo module
var myApp = angular.module('myModule', []);

// khởi tạo controller
// kết nổi controller vs module
myApp.controller("schoolController", schoolController);
myApp.service("Validator", Validator);

schoolController.$inject = ['$scope', 'Validator']

function schoolController($scope, Validator) {

    $scope.checkNumber = function() {
        $scope.message = Validator.checkNumber(2);
    }
    $scope.num = 1;
}

function Validator($window) {
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