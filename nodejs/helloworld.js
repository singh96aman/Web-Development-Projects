var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('I am Aman\n');
    res.end('Hello World!');
}).listen(8080); 