(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject=['$scope','apiService']
    function productCategoryListController($scope, apiService) {
        $scope.productCategories = [];

        // khai báo phương thức để láy dử liệu từ sever
        $scope.getProductCategories = getProductCategories;

        function getProductCategories() {
            // 2 hàm 1 failed và success
            apiService.get('/api/productcategory/getall', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {
                console.log('Load productcategories failed')
            });
        }
        // gòi hàm getcategory sẽ chạy nếu controller khởi chạy
            $scope.getProductCategories();   
    }
})(angular.module('tedushop.product_categories'));