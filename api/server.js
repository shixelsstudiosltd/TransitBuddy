// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express(),
    api = require('./v1/TransitBuddyApi');

var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

    server.use(express.errorHandler({

        dumpExceptions:true,

        showStack:true

    }));
    server.use(allowCrossDomain);
    server.use(express.bodyParser());

    server.use(server.router);
});

// SERVER
// ======
 //USER ROUTES
    //==========
    //app.get('/v1/users', api.getAllUsers); //get list of all users in system
    //app.delete('/v1/user/remove/:id', api.deleteUser); //remove a user
    server.get('/v1/user/trips/:id', api.getUserTrips); //get a user by their id
    server.get('/v1/user/requests/:id', api.getUserRequests); //get a user by their id
    server.post('/v1/user/register', api.registerUser); //register a user
    server.post('/v1/user/verify_user', api.verifyUserCredentials); //login user// Start Node.js Server
http.createServer(server).listen(port);