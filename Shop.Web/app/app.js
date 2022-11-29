/// <reference path="../assets/admin/libs/angular/angular.js" />
// 1 cách đê khai bào module mới
(function () {
    angular.module('tedushop', ['tedushop.products', 'tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        // cách cấu hình routing cho shop
        $stateProvider.state('home', {
            url: "/admin",
            templateUrl: "/app/components/home/homeView.html",
            controller: "homeController"
        });
        //nếu không phải trướng hợp nào thì trả về admin
        $urlRouterProvider.otherwise('/admin');
    }
})();