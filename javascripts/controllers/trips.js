sampleApp.controller('trips',function($rootScope,$scope,$location){


		$('.dash-nav').removeClass('active');
        $('.dash-trips').addClass('active');
        $scope.go = function (path){
            $location.path(path);
        }
})