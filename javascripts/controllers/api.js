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
        	TB.user = function() {
        		return TB.api.user(user_session.user_id);
        	}
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
        }
    };

     
});