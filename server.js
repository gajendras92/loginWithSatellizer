// modules =================================================
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app    = express();
var fs = require('fs');
// configuration ===========================================


// connect to our mongoDB database ========================
var dbPath = require('./config/db');
mongoose.connect(dbPath.url);
mongoose.connection.on('error',function(){
    console.log('mongodb connection Error. please make sure that mongodb is running.');
});

// parse application/json ================================
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/client'));

// set our port===========================================
var port = process.env.PORT || 2000;  // startup our app at http://localhost:2000

// load models ===========================================
var model_files, model_loc;
app.models = {};
model_loc = __dirname + '/models';
model_files = fs.readdirSync(model_loc);
model_files.forEach(function (file) {
    return (require(model_loc + '/' + file)).boot(app);
});

// load all controller =====================================
var controller_loc = __dirname + '/controllers';
var controller_files = fs.readdirSync(controller_loc);
controller_files.forEach(function (file) {
    return (require(controller_loc + '/' + file))(app);
});

// load all routes ===========================================
var routes_loc = __dirname + '/routes';
var routes_files = fs.readdirSync(routes_loc);
routes_files.forEach(function (file) {
    return (require(routes_loc + '/' + file))(app);
});

app.listen(port);