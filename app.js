
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var messages = require('./routes/messages');
var http = require('http');
var path = require('path');
var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Sysive');
var collection = db.get('messagecollection');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/messages', messages.list(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

sock = dgram.createSocket("udp4", function (msg, rinfo) {
	//log('got message from '+ rinfo.address +':'+rinfo.port);
	//log('data len: '+ rinfo.size + " data: "+ msg.toString('ascii', 0, rinfo.size));
	collection.insert({
		"sourceip" : rinfo.address,
		"data" : msg.toString('ascii', 0, rinfo.size)
	}, function (err, doc) {
		if (err) {
			console.log('Error writing');
		}
		else {
			console.log('Successful log');
		}
	});
});

sock.on('listening', function() {
	log('Bound to localhost:514');
});
sock.bind(514, '0.0.0.0');
