/// <reference path="../assets/admin/libs/angular/angular.js" />
// 1 cách đê khai bào module mới
(function () {
    angular.module('tedushop', ['tedushop.products',
                                'tedushop.product_categories',
                                'tedushop.common'])
                                .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        // cách cấu hình routing cho shop
        $stateProvider
            .state('base', {
                url: '',
                templateUrl: '/app/shared/views/baseView.html',
                abstract: true
            }).state('login', {
                url: "/login",
                templateUrl: "/app/components/login/loginView.html",
                controller: "loginController"
            })
            .state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/app/components/home/homeView.html",
                controller: "homeController"
            });
        //nếu không phải trướng hợp nào thì trả về admin
        $urlRouterProvider.otherwise('/login');
    }
})();