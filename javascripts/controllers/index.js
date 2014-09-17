sampleApp.controller('index',function($rootScope,$scope,$location){
		$rootScope.location = $location;
		$scope.s_master = "yo homie";
		$scope.showNav = function(){
		   //if(($location.path() !== '/login') && ($location.path() !== 'register')){
		        return "/partials/nav.html";
		    //}
		    //return "";
		}
		$scope.showFooter = function(){
		    //if(($location.path() !== '/login') && ($location.path() !== 'register')){
		        return "/partials/footer.html";
		    //}
		    //return "";
		}
        // $scope.go = function (path){
        //     $location.path(path);
        // }
})