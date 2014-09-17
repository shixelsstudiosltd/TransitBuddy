sampleApp.controller('tour',function($rootScope,$scope,$location){


	 $('.nav-item').removeClass('active');
        $('.tour-nav').addClass('active');
        $scope.go = function (path){
            $location.path(path);
        }
})