/* ======= API ======= */
$(document).ready(function() {

	TB.api = function (){};

    
    TB.api = {
    	url: function () {return 'http://localhost:8001/'},
    	register: function (user){
    		var self = this;
            $.ajax({
                type: "POST",
                url: TB.api.url() + "v1/user/register",
                data: user,
                dataType: 'json',
                success: function (response) {
                    if (response.success === 0) {
                           $('.reg-error').html(response.data.error);
                           $('.reg-error-modal').removeClass('hide');
                     }
                    else {
                    	$('.reg-error-modal').addClass('hide');
                    	$('.reg-s-name').html(response.data.registeredUser.fname);
                    	$('.reg-s-email').html(response.data.registeredUser.email);
                        $('.reg-success').removeClass('hide');
                        $('.top-reg').addClass('hide');
                    }
                    //MB.appRouter.navigate('#register', { trigger: true });
                },
                error: function (response) {
                    $('.reg-error').html("error: ", response); //TODO-(Fara) : add to Error Modal
                    $('.reg-error-modal').removeClass('hide');

                }
            });
    	},
    	 login: function(params) {
            var send = null;
            var self = this;
            $.ajax({
                type: "POST",
                url: TB.api.url() + "v1/user/verify_user",
                data: params,
                dataType: 'json',
                success: function (response) {
                        // show an error
						send = response; 
						self.session(response.data.user.user_id); //start session
                },
                error: function(response) {
                    console.log("error! ", response); //TODO-(Fara): add to Error Modal
                },
                async: false
            });

            return send;
        },
        session: function(user) {
        	var user_session = {user_id: user};
        	sessionStorage.setItem('user_session', JSON.stringify(user_session)); //store temporary item into session storage 
        	
        },
        current: function() {
            user_id = JSON.parse(sessionStorage.getItem('user_session')).user_id;
            return  TB.api.user(user_id);
        },
        user: function(user_id) {
        	var send = null;
            $.ajax({
                type: "GET",
                url: TB.api.url() + "v1/users/" + user_id,
                dataType: 'json',
                success: function (response) {
                    send = response.data.user;
                },
                error: function(response) {
                    console.log("error! ", response.error); //TODO-(Fara): add to Error Modal
                },
                async: false
            });

            return send;
        },
        generate_tracker: function(account_id, delivery_speed) {
            var date = new Date().getTime();
            var tracking_format = 'TB' + account_id + delivery_speed + '4xxxxxxy';
            var tracking_number = tracking_format.replace(/[xy]/g, function(variants) {
                var rand = (date + Math.random()*16)%16 | 0;
                date = Math.floor(date/16);
                var id = (variants == 'x' ? rand : (rand&0x7|0x8)).toString(16);
                id = id.toUpperCase();
                return id;
            });
            return tracking_number;
        },
        generate_account_id : function () {
            var date = new Date().getTime();
            var id_format = 'xxxxxx';
            var account_id = id_format.replace(/[xy]/g, function(variants) {
                var rand = (date + Math.random()*16)%16 | 0;
                date = Math.floor(date/16);
                var id = (variants == 'x' ? rand : (rand&0x7|0x8)).toString(16);
                id = id.toUpperCase();
                return id;
            });
            return account_id;
        }
    };

     
});