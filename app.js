
//
// Module dependencies.
//

var express = require('express');
var routes = require('./routes');
var messages = require('./routes/messages');
var http = require('http');
var path = require('path');
var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;
var app = express();
var moment = require('moment');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Sysive');
var collection = db.get('messagecollection');
// Express Middleware
var morgan = require('morgan');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(morgan('combined'));
app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/*
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
*/

// Routes
app.get('/', routes.index);
app.get('/messages', messages.list(db));


//Start Express Server
http.createServer(app).listen(app.get('port'), function(){
  log('Express server listening on port ' + app.get('port'));
});

///Create socket with callback for message event listener
sock = dgram.createSocket("udp4", function (msg, rinfo) {
	collection.insert({
        "timestamp" : moment().format('YYYYMMDD:HHmm:ss:SS'),
		"sourceip" : rinfo.address,
		"data" : msg.toString('ascii', 0, rinfo.size)
	}, function (err, doc) {
		if (err) {
			log('Error writing');
		}
		else {
			log('Successful log');
		}
	});
});

sock.bind(514, '0.0.0.0');
sock.on('listening', function() {
	log('Syslog server listening on localhost:514');
});

