sampleApp.controller('settings',function($rootScope,$scope,$location){

		$('.dash-nav').removeClass('active');
        $('.dash-settings').addClass('active');

        $scope.go = function (path){
            $location.path(path);
        }
})