(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService']

    function productCategoryListController($scope, apiService, notificationService) {
        $scope.productCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.getProductCagories = getProductCagories;
        $scope.keyword = '';

        //baiding su7j kiện keyword
        $scope.search = search;
        function search() {
            getProductCagories();
        }
        // khai báo phương thức để láy dử liệu từ sever
        function getProductCagories( page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 20
                }
            }
            // 2 hàm 1 failed và success
            apiService.get('/api/productcategory/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('không có bản ghi nào tìm thấy.')
                } else {
                    notificationService.displaySuccess('đã tìm tháy '+result.data.TotalCount+' bản ghi.')
                }
                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                console.log('Load productcategories failed')
            });
        }
        // gòi hàm getcategory sẽ chạy nếu controller khởi chạy
        $scope.getProductCagories();
    }
})(angular.module('tedushop.product_categories'));