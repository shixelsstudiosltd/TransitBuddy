sampleApp.controller('login',function($rootScope,$scope,$location){

		$('.tb-login-button').click(function (e) {
			e.preventDefault();

			var login_user = {
				email: $('.login-email').val(),
				password: $('.login-password').val()
			};
			if (!login_user.email) {
				$('.login-error').html('Please enter your email');
				$('.login-error-modal').removeClass('hide');
			} else if (!login_user.password) {
				$('.login-error').html('Please enter your password');
				$('.login-error-modal').removeClass('hide');
			}
			else {
				$('.login-loader').removeClass('hide');
				setTimeout( function() {
	       			$('.login-loader').addClass('hide');
	       			var login_token = TB.api.login(login_user);
	       			if (login_token.success === 1) {	
	       				$location.path('/dashboard');
	       				if(!$scope.$$phase) $scope.$apply()
	       			} else {
	       				 $('.login-error').html(login_token.data.error);
						$('.login-error-modal').removeClass('hide');
	       			}
	              },500);
			}
		});


        $scope.go = function (path){
            $location.path(path);
        }
})