var http = require('http');
var url = require('url');

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';

http.createServer(function (req,res){
	res.writeHead(200, {'Content-Type':'text/html'});
	var q = url.parse(req.url, true).query;
	var txt = q.year + " " + q.month;
	res.write(txt);
	var q = url.parse(adr, true);
	//res.write(q.host+" "+q.pathname+" "+q.search);
	//Javascript object cannot be directly printed on html
	console.log(q.host);
	console.log(q.pathname);
	console.log(q.search);
	console.log(q.query);
	res.end();
}).listen(8080);

// http://localhost:8080/?year=2017&month=July
// cannot handle & in text ?