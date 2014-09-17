sampleApp.controller('pricing',function($rootScope,$scope,$location){

	 $('.nav-item').removeClass('active');
        $('.pricing-nav').addClass('active');

        $scope.go = function (path){
            $location.path(path);
        }
})