var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;

sock = dgram.createSocket("udp4", function (msg, rinfo) {
	log('got message from '+ rinfo.address +':'+rinfo.port);
	log('data len: '+ rinfo.size + " data: "+ msg.toString('ascii', 0, rinfo.size));
});

sock.on('listening', function() {
	log('Bound to localhost:514');
});
sock.bind(514, '0.0.0.0');
