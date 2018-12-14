// Events 
// This is a sample event
var fs = require('fs');
var rs = fs.createReadStream('./demofile1.html');
rs.on('open', function(){
	console.log('The file is open');
});

// Event and Event Emitter

//Use of events built-in package
var events = require('events');
var eventEmitter = new events.EventEmitter();

var myEventHandler = function(){
	console.log('I hear a scream');
}
eventEmitter.on('scream', myEventHandler);
eventEmitter.emit('scream');