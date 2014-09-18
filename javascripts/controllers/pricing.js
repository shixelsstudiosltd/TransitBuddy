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
	            $('.item-subcat').append('<option val="' + sub_val + '">'+t+'</option>');
	            sub_val++;
	        });
	    }
        $scope.go = function (path){
            $location.path(path);
        }

        $('.item-cost-ngn').click(function(e) {
        	e.preventDefault();
        	var in_ngn = parseInt($('.item-cost').text()) * 161.77;
        	$('.item-cur').html('&#8358;');
        	$('.item-cost').html(in_ngn);
        	$('.item-cost-ngn').addClass('hide');
        	$('.item-cost-doll').removeClass('hide');

        });

		$(".item-cost-doll").on("click", function(e) {
        	e.preventDefault();
        	var in_doll = parseInt($('.item-cost').text()) / 161.77;
        	$('.item-cur').html('$');
        	$('.item-cost').html(in_doll);
        	$('.item-cost-ngn').removeClass('hide');
        	$('.item-cost-doll').addClass('hide');

        });

        $('.item-pricing-calc').click(function (e) {
        	e.preventDefault();
        	if ($('.item-subcat').val() && $('.item-lbs').val() && $('.item-speed').val() && $('.item-origin').val() && $('.item-dest').val()) {
        		var speed_cost = 0,
        			type_cost = 0,
        			item_speed = parseInt($('.item-speed').val()),
        			type = $('.item-subcat').val(),
        			item_type = parseInt(type),
        			item_weight = parseInt($('.item-lbs').val()),
        			item_cost = 0;

        		if (item_speed === 0) {
        			speed_cost = 50;
        		} else if (item_speed === 1) {
        			speed_cost = 35;
        		} else if (item_speed === 2) {
        			speed_cost = 25;
        		} else {
        			speed_cost = 15;
        		}
        		if (item_type === 0) {
        			type_cost = 15;
        		} else if (item_type === 1) {
        			type_cost = 8.50;
        		} else if (item_type === 2) {
        			type_cost = 5.25;
        		} else {
        			type_cost = 3.15;
        		}

        		item_cost = (item_weight * 2.75) + speed_cost + type_cost;
        		$('.item-cost').html(item_cost);
        		$('.item-pricing-signup').removeClass('hide');

        	} else {
        		$('.item-pricing-error').html('Please fill out wizard completely!')
        		$('.item-pricing-error-modal').removeClass('hide').fadeIn();

        	}
        });
})