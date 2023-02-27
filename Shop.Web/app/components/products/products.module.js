/// <reference path="../../../assets/admin/libs/angular/angular.js" />
// 1 cách đê khai bào module mới
(function () {
    angular.module('tedushop.products', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        // cách cấu hình routing cho shop
        $stateProvider.state('products', {
            url: "/products",
            templateUrl: "/app/components/products/productListView.html",
            controller: "productListController"
        }).state('product_add', {
            url: "/product_add",
            templateUrl: "/app/components/products/productAddView.html",
            controller: "productAddController"
        }).state('product_edit', {
            url: "/product_edit/:id",
            templateUrl: "/app/components/products/productEditView.html",
            controller: "productEditController"
        });
    }
})();