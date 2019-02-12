'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var routeV1 = require('./routes/v1');
var AppConfig = require('./lib/AppConfig');
var debug = require('debug')('NE:Server');

//CORS
app.use(function (request, response, next) {
    debug('Inside middleware function');
    return next();
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// App Configs
app.use(AppConfig.trimParams);

app.get('/', function (request, response) {
    debug('REST API is working !');
    return response.json({message: 'REST API is working !'});
});

app.set('port', process.env.PORT || 3004);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port %o ', server.address().port);
});


//This is our route middleware
app.use('/api/v1', routeV1);

// Error handling
app.use(AppConfig.handleError);

// Handle response
app.use(AppConfig.handleSuccess);

// Handle response
app.use(AppConfig.handle404);

//Catch uncaught exceptions
process.on('uncaughtException', function (error) {
    // handle the error safely
    console.log('Inside uncaughtException');
    console.log(error);
    return error;
});
module.exports = app;