sampleApp.controller('transits',function($rootScope,$scope,$location){


		$('.dash-nav').removeClass('active');
        $('.dash-transits').addClass('active');
        $scope.go = function (path){
            $location.path(path);
        }
})