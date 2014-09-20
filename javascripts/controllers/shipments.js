sampleApp.controller('shipments',function($rootScope,$scope,$location){


		$('.dash-nav').removeClass('active');
        $('.dash-shipments').addClass('active');

        
        $scope.go = function (path){
            $location.path(path);
        }
})