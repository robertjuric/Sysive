var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;

sock = dgram.createSocket("udp4", function (msg, rinfo) {
	log('Received message from '+ rinfo.address +':'+rinfo.port);
//	log('Data len: '+ rinfo.size + " Data: "+ msg.toString('ascii', 0, rinfo.size));
	log('Data len: '+ rinfo.size + " Data: "+ msg);
});

sock.on('listening', function() {
	log('Listening on UDP/514');
});
sock.bind(514);
