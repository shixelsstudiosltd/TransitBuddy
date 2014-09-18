sampleApp.controller('profile',function($rootScope,$scope,$location){

	$('.dash-nav').removeClass('active');
        $('.dash-profile').addClass('active');

        $scope.go = function (path){
            $location.path(path);
        }
})