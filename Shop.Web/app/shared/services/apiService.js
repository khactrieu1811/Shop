﻿/// <reference path="../../../assets/admin/libs/angular/angular.js" />

//dùng chung
(function (app){
    app.factory('apiService', apiService);

    apiService.$innject = ['$http','notificationService'];// http 1 cái service có sẵn của angular

    function apiService($http, notificationService) {
        return {
            get: get,
            post: post,
            put: put
        }
        function post(url, data, success, failure) {
            $http.post(url, data).then(function (result) {
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === '401') {
                    notificationService.displayError('Authentication is requaired');
                }
                else if (failure != null) {
                    failure(error);
                }
            });
        }
        function put(url, data, success, failure) {
            $http.put(url, data).then(function (result) {
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === 401) {
                    notificationService.displayError('Authenticate is required.');
                }
                else if (failure != null) {
                    failure(error);
                }
            });
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