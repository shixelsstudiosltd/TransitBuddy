sampleApp.controller('pricing',function($rootScope,$scope,$location){

	 	$('.nav-item').removeClass('active');
        $('.pricing-nav').addClass('active');


        $('.item-lbs').keyup(function() {
       		$('.item-kg-calc').text((parseInt($('.item-lbs').val()) / 2.20462).toFixed(2));
    	});

    	Electronics = new Array("Laptop","Tablet","Phone","Other");
		Clothing = new Array('Denim','Tops','Jacket/Coat', 'Other');
		Shoes = new Array('Dress Shoes','Sneakers','Kids Shoes','Slippers','Other');
		Books = new Array('Magazine','Textbook','Notebook', 'Other');
		Beauty = new Array('Lotion','Toiletries', 'Other');



		     $('.item-cat').change(function(){
		        populateSelect();
		    });



	function populateSelect(){
	    cat= $('.item-cat').val();
	    $('.item-subcat').html('');
	    var sub_val = 0;
	       eval(cat).forEach(function(t) { 
	            $('.item-subcat').append('<option value="' + sub_val + '">'+t+'</option>');
	            sub_val++;
	        });
	    }
        $scope.go = function (path){
            $location.path(path);
        }

        $('.item-cost-ngn').click(function(e) { //toggle between naira and dollars
        	e.preventDefault();
        	var in_ngn = parseInt($('.item-cost').text()) * 163.55;  //convert to naira
        	$('.item-cur').html('&#8358;');
        	$('.item-cost').html(in_ngn.toFixed(0));
        	$('.item-cost-ngn').addClass('hide');
        	$('.item-cost-doll').removeClass('hide');

        });

		$(".item-cost-doll").on("click", function(e) { //toggle between dollars and naira
        	e.preventDefault();
        	var in_doll = parseInt($('.item-cost').text()) / 163.55; //convert to dollars
        	$('.item-cur').html('$');
        	$('.item-cost').html(in_doll.toFixed(0));
        	$('.item-cost-ngn').removeClass('hide');
        	$('.item-cost-doll').addClass('hide');

        });

        $('.item-pricing-calc').click(function (e) {
        	e.preventDefault();
        	if ($('.item-subcat').val() && $('.item-lbs').val() && $('.item-speed').val() && $('.item-origin').val() && $('.item-dest').val() && $('.item-insure').val()) {
        		var speed_cost = 0,
        			type_cost = 0,
        			item_speed = parseInt($('.item-speed').val()),
        			type = $('.item-subcat').val(),
        			item_type = parseInt(type),
        			item_weight = parseInt($('.item-lbs').val()),
        			item_insured = parseInt($('.item-insure').val()),
        			item_cost = 0,
        			insure_cost = 0,
                    fuel_surcharge = 0.45,
                    pickup_fee = 0,
                    buddy_pay = 0;

        		if (item_speed === 0) { //if 24-48 hours
        			speed_cost = 50;
        		} else if (item_speed === 1) { //if 48-72 hours
        			speed_cost = 35;
        		} else if (item_speed === 2) { //if within 1 week
        			speed_cost = 25;
        		} else { //if you dont care about speed
        			speed_cost = 15;
        		}
        		if (item_type === 0) { //if very large item
        			type_cost = 15; 
        		} else if (item_type === 1) { //if large item
        			type_cost = 8.50;
        		} else if (item_type === 2) { //if medium item
        			type_cost = 5.25;
        		} else { //all small items
        			type_cost = 3.15;
        		}
                if (item_type === 0) { //if very large item
                    pickup_fee = 25; 
                } else if (item_type === 1) { //if large item
                    pickup_fee = 17.50;
                } else if (item_type === 2) { //if medium item
                    pickup_fee = 12.25;
                } else { //all small items
                    pickup_fee = 8.15;
                }
                if (item_type === 0) { //if very large item
                    buddy_pay = 25; 
                } else if (item_type === 1) { //if large item
                    buddy_pay = 17.50;
                } else if (item_type === 2) { //if medium item
                    buddy_pay = 12.25;
                } else { //all small items
                    buddy_pay = 8.15;
                }
        		if (item_insured === 0 && item_type === 0) { //if very large item and not insured
        			insure_cost = 16.70;
        		} else  if (item_insured === 0 && item_type === 1){ //if large item and not insured
        			insure_cost = 11.5;
        		} else  if (item_insured === 0 && item_type === 2){ //if medium item and not insured
        			insure_cost = 7.80;
        		} else { //if small item and not insured or if any of the items are insured
        			insure_cost = 5;
        		} 
        		var item_weight_cost = item_weight * 2.75; //$2.75 charge per pound
                item_cost = item_weight_cost + speed_cost + type_cost + insure_cost; //calculate total cost to ship
                var fuel_surcharge_cost = item_cost * fuel_surcharge;
                var total_cost = item_cost + fuel_surcharge_cost + pickup_fee;

                var courier_fee = (fuel_surcharge_cost + pickup_fee) / 2;
                var our_fee = total_cost - courier_fee - insure_cost - buddy_pay;

                console.log('courier_fee: ', courier_fee, 'buddy_pay: ', buddy_pay, ' our_fee: ', our_fee, 'insure_cost: ', insure_cost);

        		
        		$('.item-cost').html(numberWithCommas(total_cost.toFixed(0)));
        		$('.item-pricing-signup').removeClass('hide');
        		$('.item-cost-ngn').removeClass('hide');
        		$('.item-pricing-title').html('The price to transit your <strong>' +  $(".item-subcat option:selected").text() + '</strong> will be')

        		var temp_item = { //create a temporary item so user can finish setting up shipment if they sign up
        			type: $(".item-subcat option:selected").text(),
        			cost: item_cost,
        			origin: $('.item-origin').val(),
        			dest: $('.item-dest').val(),
        			weight: item_weight,
        			speed: item_speed
        		};

        		sessionStorage.setItem('temp_item', JSON.stringify(temp_item)); //store temporary item into session storage 

        	} else {
        		$('.item-pricing-error').html('Please fill out wizard completely!')
        		$('.item-pricing-error-modal').removeClass('hide').fadeIn();

        	}
        });

		function numberWithCommas(x) {
		     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
})