/* ======= API ======= */
$(document).ready(function() {

	TB.api = function (){};

    
    TB.api = {
    	url: function () {return 'http://localhost:8001/'},
        flightstats_id: function () {return '19c83005'},
        flightstats_key: function () {return 'fefe3fd5b8e39a7a2e08b9e5c952fb42'},
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
                    	$('.reg-s-name').html(response.data.registeredUser.personal.fname);
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
                        if (response.success === 1) {
                            self.session(response.data.user.user_id); //start session
                        }
						send = response; 
						
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
        flight_schedule: function(details) {            
            return  $.ajax({
                type: "GET",
                url: "https://api.flightstats.com/flex/schedules/rest/v1/jsonp/flight/" + details.carrier_name + "/" + details.carrier_number + "/departing/" + details.year + "/" + details.month + "/" + details.day + "?appId=" + TB.api.flightstats_id() + "&appKey=" + TB.api.flightstats_key() + "&utc=false",
                dataType: 'jsonp',
                jsonpCallback: 'flightstatus',
                success: function (response) {
                    $('.trip-check-loader').addClass('hide');
                    $('.trip-step-1').addClass('hide');

                    $.each( response.scheduledFlights , function( key, value ) { 
                      for (var key2 in value) {
                          if (value.hasOwnProperty(value)) {
                            console.log(value + " -> " + value[key2]);
                          }
                        }
                    });
                    $('.trip-step-2').removeClass('hide');
                },
                error: function(response) {
                    console.log("error! ", response.error); //TODO-(Fara): add to Error Modal
               }
            });
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
        },
        generate_timestamp: function() {
            var timestamp;

            // Date() prototype does not provide native number padding - let's add a method:
            Date.prototype.pad = function(integer) {
                var result;
                // Can't decide between ternary and slicing
                // result = ("0" + integer).slice(-2); 
                result = integer < 10
                            ? "0" + integer
                            : integer;

                return result;
            };

            // Create a new Date() instance and add day, time and now properties
            timestamp = new Date();

            // Reorder the array entries to your own needs
            timestamp.day = [
                timestamp.pad(timestamp.getDate()),
                timestamp.pad(timestamp.getMonth() + 1), // getMonth() returns 0 to 11
                timestamp.getFullYear()
            ];

            timestamp.time = [
                timestamp.pad(timestamp.getHours()),
                timestamp.pad(timestamp.getMinutes()),
                timestamp.pad(timestamp.getSeconds())
            ];

            timestamp.now = timestamp.day.join("") + timestamp.time.join("");

            return timestamp.now;
        
    },
    generate_delivery: function(delivery_speed) {
        var date = new Date();
        var res = date.setTime(date.getTime() + (delivery_speed * 24 * 60 * 60 * 1000));
        date = new Date(res);
        
        return date;
    }
}

     
});