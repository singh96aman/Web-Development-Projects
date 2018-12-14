// cd /usr/local/mysql/bin/
// ./mysql -u root -p
// Pass 24singh96

// Create Connection

var mysql = require('mysql');

var con = mysql.createConnection({
	host : "localhost",
	user : "root", // IMPORTANT
	password : "24singh96"
});


con.connect(function(err){
	if(err) throw err;
	console.log("Connected !");
	con.query("select * from js.login", function(err, result){
		if(err) throw err;
		console.log("Result "+result.insertId);
	});
});


/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var sql = "CREATE TABLE js.customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
  //con.query(sql, function (err, result) {
  //		if (err) throw err;
  //		console.log("Table created");
  //	});
	
  var sql = "INSERT INTO js.customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
   		if (err) throw err;
   		console.log("1 record inserted");
  	});
}); 
*/