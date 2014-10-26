sampleApp.controller('profile',function($rootScope,$scope,$location){

		$('.dash-nav').removeClass('active');
        $('.dash-profile').addClass('active');

        if (TB.api.current()) {
        	$scope.current_user = TB.api.current();
            console.log('your in there..'+ $scope.current_user.personal.fname);
        } else {
            $scope.current_user = 'noone';
        	$location.path('/login');
        	if(!$scope.$$phase) $scope.$apply();
        }


        $scope.go = function (path){
            $location.path(path);
        }
})