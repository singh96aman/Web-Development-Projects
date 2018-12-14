var http = require('http');
var fs = require('fs');

http.createServer( function (req,res){
	fs.readFile('demofile1.html', function(err,data){
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write(data);
	res.end();
	});
}).listen(8080);

// Creating and updating a file 
fs.appendFile('demofile2.html', 'Hello Content!', function(err){
	if(err) throw err;
	console.log('Saved!');
});

fs.appendFile('demofile2.html', 'WOWOWOW', function(err){
	if (err) throw err;
	console.log('Updated!');
});

// Deleting a file

/*
fs.unlink('demofile2.html', function(err){
 	if (err) throw err;
 	console.log('File Deleted');
});
*/

// Rename a file

/*
fs.rename('demofile2.html', 'demofilerenamed.html', function(err){
	if (err) throw err;
	console.log('File Renamed');
});
*/