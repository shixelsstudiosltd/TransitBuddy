{
	"_id" : "user unque id", 
	"account": {
		"_id": ""
		"email": ""
		"dl_num": ""
		"password": ""
		"profile_pic": ""
		"is_verified" : ""
		"wallet": { 
			"tb_bucks": {
				"amount": ""
				"transfer_type": ""
				"trasfer_freq": ""
			},
			"cards": [ 
				{
					"type": "",
					"last_4": ""
				}
			] ,
			"banks": [
				{
					"bank_name": "",
					"account_name": "",
					"routing_number": "",
					"account_number": ""
				}
			]

		}
	},
	"personal" : { 
		"fname" : "",
	    "lname" : "",
	    "phone" : "",
	    "address": { 
	    	"biiling": { 
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": ""

	    	},
	    	"shipping" : {
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": ""
	    	}
	    }
	},
	"app_config": { 
		"requests": [], 
		"shipments" : [],
		"transits" : [], 
		"trips": []
	}       
    
}

{
	"_id": "",
	"tracking_number": "", 
	"pickup": {
		"address": { 
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": "",
	    	},
	    "datetime": "",
	    "attempts": "" 
	},
	"items": [
		{
			"_id": "", 
			"tracking_number": "", 
			"transit_buddy": "",
			"is_matched": "", 
			"type": "", 
			"origin": "", 
			"cost": "", 
			"dest": "", 
			"weight": , 
			"speed": "",
			"reward": "", 
			"expected_delivery": "",
			"delivery_address": "", 
			"transit_status": "",
			"images" : { 
				"image_1": "",
				"image_2": "",
				"image_3": ""
			}
		}
	],
	"expected_delivery_range": "", 
	"transit_status": "",
	"total_cost": "", 
	"is_paid": "", 
	"is_completed": "", 
	"is_pickedup": "", 
	"shipper_id": "" 
}


{
	"_id": "",
	"tracking_number": "",
	"transit_buddy": "",
	"type": "",
	"shipper_id": "",
	"origin": "",
	"dest": "",
	"weight": ,
	"reward": ,
	"speed": "",
	"expected_delivery": "",

	"transit_status": "",
	"images" : {
		"image_1": "",
		"image_2": "",
		"image_3": ""
	}

}


{
	"_id": "",
	"buddy_requests": [],
	"type": "",
	"origin": "",
	"dest": "",
	"weight": ,
	"reward": ,
	"images" : {
		"image_1": "",
		"image_2": "",
		"image_3": ""
	}
}


{
	"_id": "",
	"trip_user": "", 
	"flight": {
		"_id": "", 
		"airline": "", 
		"departure_airport": "", 
		"arrival_airport": "", 
		"arrival_datetime": "",
		"departure_datetime": "", 
		"ticket_class": "", 
		"baggage_allotment": "", 
		"num_baggage": "",
		"max_weight": "" 
	},
	"transits": [], 
	"baggage": [ 
		{
			"space": "", 
			"weight": "" 
		}
	]
}


{
	"_id": "",
	"courier_id": "",
	"courer_pay": "",
	"address": { 
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": "",
	    	},
	"datetime": "", 
	"shipment": [ 
		{
			"_id": ""
			"total_items": "",
			"pickup_items" [
				{
					"_id": "", 
					"projected_weight": "",
					"actual_weight": "",
					"projected_type": "",
					"actual_type": "",
					"images" : { 
						"image_1": "",
						"image_2": "",
						"image_3": ""
					},
					"confirm_item": "",
					"is_taken": "", 
					"cost_offset": "",
					"cost": "", 
					"courier_item_pay": ""
				}
			]
		}
	],
	"is_completed": "", 
	"signature": "", 
	"accept_terms" 
}




{
	"_id" : "", 
	"account: " {
		"_id": "", 
		"email": "", 
		"dl_num": "", 
		"password": "", 
		"profile_pic": "", 
		"is_verified" : false, 
		"wallet": { 
			"tb_bucks": "", 
			"cards": [
				{
					"type": "",
					"last_4": ""
				}
			] ,
			"banks": [
				{
					"bank_name": "",
					"account_name": "",
					"routing_number": "",
					"account_number": ""
				}
			]

		}
	},
	"personal" : { 
		"fname" : "",
	    "lname" : "",
	    "phone" : "",
	    "address": { 
	    	"biiling": { 
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": "",

	    	},
	    	"shipping" : { 
	    		"street1": "",
	    		"street2": "",
	    		"city": "",
	    		"state": "",
	    		"lga": "",
	    		"country": "",
	    		"postal_code": "",
	    	}
	    }
	},
	"app_config": { 
		"pickups": [] 
	}       
    
}
