sampleApp.controller('profile',function($rootScope,$scope,$location){

		$('.dash-nav').removeClass('active');
        $('.dash-profile').addClass('active');

        $scope.user = TB.user();

        $scope.go = function (path){
            $location.path(path);
        }
})