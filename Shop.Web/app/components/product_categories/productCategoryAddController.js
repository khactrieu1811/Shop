(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);
    productCategoryAddController.$inject = ['apiService', '$scope', 'notificationService', '$state','commonService']
    function productCategoryAddController(apiService, $scope, notificationService, $state, commonService) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true,
        }
        $scope.AddProductCategory = AddProductCategory;

        $scope.GetSeoTitle = GetSeoTitle;

        function GetSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        }
        function AddProductCategory() {
            apiService.post('api/productcategory/create', $scope.productCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + 'thêm mới thành công.');
                    $state.go('product_categories');
                }, function (error) {
                    notificationService.displayError('Thêm mới thất bại.')
                });            
        }
        function loadParentCategory() {
            apiService.get('api/productcategory/getallparents', null,
                function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Cannot get list parent')
            });
        }
        loadParentCategory();
    }
})(angular.module('tedushop.product_categories'));