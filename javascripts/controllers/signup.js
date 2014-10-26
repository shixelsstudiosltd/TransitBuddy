sampleApp.controller('signup',function($rootScope,$scope,$location){

		$('.reg-submit').click(function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "slow");
			if ($('.reg-pass').val() && ($('.reg-pass').val() !== $('.reg-rpass').val())) { //check if password and repeat are same
				$('.reg-error').html('Passwords must match!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-pass').val() && ($('.reg-pass').val().length < 6)) { //check if password is 6 characters or longer
				$('.reg-error').html('Password must be at least 6 characters long!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-email').val() && (isValidEmail($('.reg-email').val()))) { //checkes if email is valid
				$('.reg-error').html('Email is not valid!');
				$('.reg-error-modal').removeClass('hide');
			} else if ($('.reg-terms:checked').val() !== 'on') { //checkes if terms are checks
				$('.reg-error').html('You must accept the terms and conditions!');
				$('.reg-error-modal').removeClass('hide');
			}
			//check if everything is filled
			else if ($('.reg-email').val() && $('.reg-fname').val() && $('.reg-lname').val() && $('.reg-phone').val() && $('.reg-pass').val() && $('.reg-rpass').val()){
				if (sessionStorage.getItem('user_shipment')) {
					var user_shipment = JSON.parse(sessionStorage.getItem('user_shipment'));
					var account_num = user_shipment.tracking_number.substring(2,8);
				} else {
					user_shipment = null;
					account_num = TB.api.generate_account_id();
				}
				var reg_user = {
					account: {
						_id: account_num,
						email: $('.reg-email').val(),
						dl_num: null,
						dl_state: null,
						password: $('.reg-pass').val(),
						profile_pic: null,
						is_verified : false,
						wallet: { 
							tb_bucks: {
								amount: 0,
								transfer_type: "manual",
								trasfer_freq: "manual"
							},
							cards: [ 
								{
									type: null,
									last_4: null
								}
							] ,
							banks: [
								{
									bank_name: null,
									account_name: null,
									routing_number: null,
									account_number: null
								}
							]

						}
					},
					personal : { 
						fname : $('.reg-fname').val(),
					    lname : $('.reg-lname').val(),
					    phone : $('.reg-phone').val(),
					    address: { 
					    	biiling: { 
					    		street1: null,
					    		street2: null,
					    		city: null,
					    		state: null,
					    		lga: null,
					    		country: null,
					    		postal_code: null

					    	},
					    	shipping : {
					    		street1: null,
					    		street2: null,
					    		city: null,
					    		state: null,
					    		lga: null,
					    		country: null,
					    		postal_code: null
					    	}
					    }
					},
					app_config: { 
						requests: [], 
						shipments : [user_shipment],
						transits : [], 
						trips: []
					}       
				    
				};
				console.log(reg_user);
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
		    var re = /^(([^<>()[\]\\.,;:\s@\]+(\.[^<>()[\]\\.,;:\s@\]+)*)|(\.+\))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		} 
      
        $scope.go = function (path){
            $location.path(path);
        }
})