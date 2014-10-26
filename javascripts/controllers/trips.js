sampleApp.controller('trips',function($rootScope,$scope,$location){

		$('.trip_next_1').click(function(e) {
			e.preventDefault();

			if  (  $('.trip-year').val() && $('.trip-month').val() && $('.trip-day').val()  && $('.trip-num').val() )  {
				var flight_c_num = ($('.trip-num').val()).replace(/\D/g, "");
				var flight_c_name = ($('.trip-num').val()).replace(/[^a-z]/gi, "");   
				var flight_details = {carrier_name: flight_c_name, carrier_number: flight_c_num, year: $('.trip-year').val(), month: $('.trip-month').val(), day: $('.trip-day').val()};
				$('.trip-check-loader').removeClass('hide');
				setTimeout( function() {
	       			TB.api.flight_schedule(flight_details);
	            },500);
			}
			
		});
		

		$('.dash-nav').removeClass('active');
        $('.dash-trips').addClass('active');
        $scope.go = function (path){
            $location.path(path);
        }
})