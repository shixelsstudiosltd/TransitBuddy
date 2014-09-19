
//  ______   _______
// (  __  \ (  ____ \|\     /|
// | (  \  )| (    \/| )   ( |
// | |   ) || (__    | |   | |
// | |   | ||  __)   ( (   ) )
// | |   ) || (       \ \_/ /
// | (__/  )| (____/\  \   /
// (______/ (_______/   \_/

(function(){
	'use strict';

	var mongo = require('mongodb');
	var MongoServer = mongo.Server;
	var database = mongo.Db;
	var BSON = mongo.BSONPure;
	var bcrypt = require('bcrypt-nodejs');
	var dbDetails = {
		host: 'localhost',
		port: 27017,
		user: 'admin',
		pass: 'TBAdmin',
		envDB: 'TransitBuddy',
	};
	var responsePackage = {
		success: null,
		data: {}
	};

	dbDetails.port = parseInt(dbDetails.port);
	var transitBuddyServer = new MongoServer(dbDetails.host, dbDetails.port, {});
	var transitBuddyDB = new database(dbDetails.envDB, transitBuddyServer, {auto_reconnect: true, w: 'majority'});


	transitBuddyDB.open(function (error, transitBuddyDB) {
		if (error) {
			responsePackage.success = 0;
			responsePackage.data = {};
			responsePackage.data = {'error': error};
			console.log(responsePackage);
		}

		transitBuddyDB.authenticate(dbDetails.user, dbDetails.pass, function(err) {
			if (err) {
				responsePackage.success = 0;
				responsePackage.data = {};
				responsePackage.data = {'error': err};
				console.log(responsePackage);
			} else {
				transitBuddyDB.collection('tb_users', {strict: true}, function (error) {
					if (error) {
						responsePackage.success = 0;
						responsePackage.data = {};
						responsePackage.data = {'error': error};
						console.log(responsePackage);
					}
				});
			}
		});
	});


//           _______  _______  _______  _______
// |\     /|(  ____ \(  ____ \(  ____ )(  ____ \
// | )   ( || (    \/| (    \/| (    )|| (    \/
// | |   | || (_____ | (__    | (____)|| (_____
// | |   | |(_____  )|  __)   |     __)(_____  )
// | |   | |      ) || (      | (\ (         ) |
// | (___) |/\____) || (____/\| ) \ \__/\____) |
// (_______)\_______)(_______/|/   \__/\_______)



	// exports.getAllUsers = function (request, response) {
	// 	transitBuddyDB.collection('tb_users', function (error, collection) {
	// 		collection.find().toArray(function (error, items) {
	// 			if (error) {
	// 				responsePackage.success = 0;
	// 				responsePackage.data = {};
	// 				responsePackage.data = {'error': error};
	// 				response.send(responsePackage);
	// 			} else {
	// 				responsePackage.success = 1;
	// 				responsePackage.data = {};
	// 				responsePackage.data.users = items;
	// 				response.send(responsePackage);
	// 			}
	// 		});
	// 	});
	// };

	exports.getUserById = function(request, response) {
		var id = request.params.id;
		transitBuddyDB.collection('tb_users', function(error, collection) {
			collection.findOne({'_id':new BSON.ObjectID(id)}, function(error, user) {
				if (error) {
					responsePackage.success = 0;
					responsePackage.data = {};
					responsePackage.data = {'error': error};
					response.send(responsePackage);
				} else {
					delete user.password;
					responsePackage.success = 1;
					responsePackage.data = {};
					responsePackage.data.user = user;
					response.send(responsePackage);
				}
			});
		});
	 };

	exports.verifyUserCredentials = function (request, response) {
		var credentials = request.body;

		if (credentials.email && credentials.password) {
			transitBuddyDB.collection('tb_users', function (error, collection) {
				collection.findOne({
					'email': credentials.email
				},
				function (error, user) {
					if (user && user.email) {
						bcrypt.compare(credentials.password, user.password, function(err, res) {
							if (err) {
								responsePackage.success = 0;
								responsePackage.data = {};
								responsePackage.data = {'error': err};
								response.send(responsePackage);
							}

							if (res === true) {
								responsePackage.success = 1;
								responsePackage.data = {};
								responsePackage.data.user  = {};
								responsePackage.data.user.user_id = user._id;
								responsePackage.data.user.user_type = user.user_type;
								response.send(responsePackage);
							} else {
								responsePackage.success = 0;
								responsePackage.data = {};
								responsePackage.data = {'error': 'Email and password do not match!'};
								response.send(responsePackage);
							}
						});
					} else {
						responsePackage.success = 0;
						responsePackage.data = {};
						responsePackage.data = {'error': 'user not found!'};
						response.send(responsePackage);
					}
				});
			});
		}
	};

	exports.registerUser = function (request, response) {
		var registerdUser = request.body;

		transitBuddyDB.collection('tb_users', function (error, collection) {
			collection.findOne({
				'email': registerdUser.email
			},
			function (error, existingUser) {
				if (existingUser && existingUser.email) { //if user exists
					responsePackage.success = 0;
					responsePackage.data = {};
					responsePackage.data = {'code': 'TBREG101', 'error': 'An account already exisits for this email address, '};
					response.send(responsePackage);
				} else { //if user doesn't exist create them
					//salt password
					bcrypt.genSalt(10, function(er) {
						bcrypt.hash(registerdUser.password, null, null, function(err, hash) {
							if (er) {
								responsePackage.success = 0;
								responsePackage.data = {};
								responsePackage.data = {'code': 'TBREG102', 'error': er};
								response.send(responsePackage);
							}
							registerdUser.password = hash; //overwrite password entered with hashed and salted version
							registerdUser.is_verified = false;
							registerdUser.has_loggedin = false;
							//add registerdUser to database with hashed password
							transitBuddyDB.collection('tb_users', function (error, collection) {
								collection.insert(registerdUser, {safe: true}, function (error, result) {
									if (error) {
										responsePackage.success = 0;
										responsePackage.data = {};
										responsePackage.data = {'code': 'TBREG103', 'error': error};
										response.send(responsePackage);
									} else {
										responsePackage.success = 1;
										responsePackage.data = {};
										responsePackage.data.registeredUser = result[0];
										response.send(responsePackage);
									}
								});
							});
						});
					});
				}
			});
		});
	};

	// exports.deleteUser = function (request, response) {
	// 	var id = request.params.id;

	// 	transitBuddyDB.collection('tb_users', function (error, collection) {
	// 		collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (error, result) {
	// 			if (error) {
	// 				responsePackage.success = 0;
	// 				responsePackage.data = {};
	// 				responsePackage.data = {'error': 'An error has occurred - ' + error};
	// 				response.send(responsePackage);
	// 			} else {
	// 				responsePackage.success = 1;
	// 				responsePackage.data = {};
	// 				responsePackage.data.user = request.body;
	// 				responsePackage.data.result = result;
	// 				response.send(responsePackage);
	// 			}
	// 		});
	// 	});
	// };

//	_________ _______  _______  _        _______
// \__   __/(  ___  )(  ____ \| \    /\(  ____ \
//    ) (   | (   ) || (    \/|  \  / /| (    \/
//    | |   | (___) || (_____ |  (_/ / | (_____
//    | |   |  ___  |(_____  )|   _ (  (_____  )
//    | |   | (   ) |      ) ||  ( \ \       ) |
//    | |   | )   ( |/\____) ||  /  \ \/\____) |
//    )_(   |/     \|\_______)|_/    \/\_______)


	// exports.getTaskById = function(request, response) {
	// 	var id = request.params.id;
	// 	transitBuddyDB.collection('tb_tasks', function(error, collection) {
	// 		collection.findOne({'_id':new BSON.ObjectID(id)}, function(error, task) {
	// 			if (error) {
	// 				responsePackage.success = 0;
	// 				responsePackage.data = {};
	// 				responsePackage.data = {'error': error};
	// 				response.send(responsePackage);
	// 			} else {
	// 				responsePackage.success = 1;
	// 				responsePackage.data = {};
	// 				responsePackage.data.task = task;
	// 				response.send(responsePackage);
	// 			}
	// 		});
	// 	});
	// };

	exports.getUserRequests = function(request, response) {
		var id = request.params.id;
		mockitbrdDB.collection('tb_requests', function (error, collection) {
		collection.find({'user': new BSON.ObjectID(data.id) }).toArray(function (error, requests) {
			if (error) {
				responsePackage.success = 0;
				responsePackage.data = {};
				responsePackage.data = {'error': error};
				response.send(responsePackage);
			} else {
				responsePackage.success = 1;
				responsePackage.data = {};
				responsePackage.data.requests = requests;
				response.send(responsePackage);
			}
		});
		});
	};


	exports.getUserTrips = function(request, response) {
		var id = request.params.id;
		mockitbrdDB.collection('tb_trips', function (error, collection) {
		collection.find({'user': new BSON.ObjectID(data.id) }).toArray(function (error, requests) {
			if (error) {
				responsePackage.success = 0;
				responsePackage.data = {};
				responsePackage.data = {'error': error};
				response.send(responsePackage);
			} else {
				responsePackage.success = 1;
				responsePackage.data = {};
				responsePackage.data.requests = requests;
				response.send(responsePackage);
			}
		});
		});
	};








//          _______  _______  _______
// |\     /|(  ____ \(  ____ \(  ____ )
// | )   ( || (    \/| (    \/| (    )|
// | |   | || (_____ | (__    | (____)|
// | |   | |(_____  )|  __)   |     __)
// | |   | |      ) || (      | (\ (
// | (___) |/\____) || (____/\| ) \ \__
// (_______)\_______)(_______/|/   \__/

//  _______  _______ __________________ _______  _        _______
// (  ___  )(  ____ \\__   __/\__   __/(  ___  )( (    /|(  ____ \
// | (   ) || (    \/   ) (      ) (   | (   ) ||  \  ( || (    \/
// | (___) || |         | |      | |   | |   | ||   \ | || (_____
// |  ___  || |         | |      | |   | |   | || (\ \) |(_____  )
// | (   ) || |         | |      | |   | |   | || | \   |      ) |
// | )   ( || (____/\   | |   ___) (___| (___) || )  \  |/\____) |
// |/     \|(_______/   )_(   \_______/(_______)|/    )_)\_______)

	
	// exports.removeNotification = function (request, response) {
	// 	var notData = request.body;
	// 	transitBuddyDB.collection('tb_users', function (error, userCollection) {
	// 		userCollection.update({'_id': new BSON.ObjectID(notData.user) }, { '$pull': { 'notifications': { '_id': new BSON.ObjectID(notData.not_id)} } }, function (error, result) {
	// 			if (error) {
	// 				responsePackage.success = 0;
	// 				responsePackage.data = {};
	// 				responsePackage.data = {'code': 'TBREG106', 'error': error};
	// 				response.send(responsePackage);
	// 			} else {
	// 				responsePackage.success = 1;
	// 				responsePackage.data = {};
	// 				responsePackage.data.message = "successfully removed notification with id: " + notData.not_id;
	// 				response.send(responsePackage);
	// 			}
	// 		});
	// 	});

	// };

	

	// exports.makeComment = function (request, response) {
	// 	var post = request.body;
	// 	var postId = post.post_id;
	// 	var comment = post.comment;
	// 	comment._id = new BSON.ObjectID();
	// 	transitBuddyDB.collection('tb_posts', function (error, postCollection) {
	// 		postCollection.update({'_id': new BSON.ObjectID(postId) }, {'$push': { 'comments': comment}}, function (error, result) {
	// 			if (error) {
	// 				responsePackage.success = 0;
	// 				responsePackage.data = {};
	// 				responsePackage.data = {'code': 'TBREG104', 'error': error};
	// 				response.send(responsePackage);
	// 			} else {
	// 				responsePackage.success = 1;
	// 				responsePackage.data = {};
	// 				responsePackage.data.comment = comment;
	// 				response.send(responsePackage);
	// 			}
	// 		});
	// 	});
	// };



})();