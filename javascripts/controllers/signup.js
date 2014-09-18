sampleApp.controller('signup',function($rootScope,$scope,$location){

		$('.reg-submit').click(function (e) {
			e.preventDefault();

			if ($('.reg-pass').val() && ($('.reg-pass').val() !== $('.reg-rpass').val())) { //check if password and repeat are same
				$('.reg-error').html('Passwords must match!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-pass').val() && ($('.reg-pass').val().length < 6)) { //check if password is 6 characters or longer
				$('.reg-error').html('Password must be at least 6 characters long!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-email').val() && (!isValidEmail($('.reg-email').val()))) { //checkes if email is valid
				$('.reg-error').html('Email is not valid!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-terms:checked').val() !== 'on') { //checkes if terms are checks
				$('.reg-error').html('You must accept the terms and conditions!');
				$('.reg-error-modal').removeClass('hide');
			}
			//check if everything is filled
			else if ($('.reg-email').val() && $('.reg-fname').val() && $('.reg-lname').val() && $('.reg-phone').val() && $('.reg-pass').val() && $('.reg-rpass').val()){
				var reg_user = {
					email: $('.reg-email').val(),
					fname: $('.reg-fname').val(),
					lname: $('.reg-lname').val(),
					phone: $('.reg-phone').val(),
					password: $('.reg-pass').val(),
				}
				$('.reg-loader').removeClass('hide');
				setTimeout( function() {
	       			$('.reg-loader').addClass('hide');
	       			TB.api.register(reg_user);
	              },500);
			} else { //if anything else is missing
				$('.reg-error').html('Please fill all fields!');
				$('.reg-error-modal').removeClass('hide');
			}
			
			
				
		});
		 function isValidEmail(email) { 
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		} 
      
        $scope.go = function (path){
            $location.path(path);
        }
})