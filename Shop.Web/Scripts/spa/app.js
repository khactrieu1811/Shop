/// <reference path="../plugins/angular/angular.js" />
//khởi tạo module
var myApp = angular.module('myModule', []);

// khởi tạo controller
// kết nổi controller vs module
myApp.controller("schoolController", schoolController);
myApp.controller("studentController", studentController);
myApp.controller("teacherController", teacherController);

function schoolController($scope) {
    $scope.message = "Annoucement from school";
}
//declare
function studentController($scope) {
    $scope.message = "This is my message from student";
}
function teacherController($scope) {
    $scope.message = "This is my message from teacher";
}