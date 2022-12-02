/// <reference path="../../../assets/admin/libs/angular/angular.js" />

//dùng chung
(function (app){
    app.factory('apiService', apiService);

    apiService.$innject = ['$http'];// http 1 cái service có sẵn của angular

    function apiService($http) {
        return {
            get: get
        }
        function get(url, params, success, failure) {
            $http.get(url, params).then(function (result) {
                success(result);
            }, function (error) {
                failure(error);
            });
        }
    }
})(angular.module('tedushop.common'));