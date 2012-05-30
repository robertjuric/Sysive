var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;

sock = dgram.createSocket("udp4", function (msg, rinfo) {
	var contents = msg.toString('ascii', 0, rinfo.size);
	var pricode = contents.split(">");
	var priority = pricode[0].substring(1);
	var facility = ~~(priority / 8);
	var severity = priority%8;
	log('Split 0: '+ pricode[0]);
	log('Split 1: '+ pricode[1]);
	log('Priority: '+ priority);
	log('Received message from '+ rinfo.address +':'+rinfo.port);
	log('Facility: '+ facility);
	log('Severity: '+ severity);
	log('Data len: '+ rinfo.size + " Data: "+ msg);
});

sock.on('listening', function() {
	log('Listening on UDP/514');
});
sock.bind(514);
