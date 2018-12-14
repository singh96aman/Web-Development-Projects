var mysql = require('mysql');

var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : '24singh96',
	database : 'js'
});
/*
con.connect(function (err){
	if (err) throw err;
	console.log("Connected!");
	var sql = "INSERT INTO login VALUES ?";
	var values = [
		['John', 'Highway 71'],
   	 	['Peter', 'Lowstreet 4'],
	];
	con.query(sql, [values], function(err, result){
		if(err) throw err;
		console.log("Number of records inserted : "+result.affectedRows);
	});
});
*/
/*
con.connect(function (err){
	if (err) throw err;
	console.log("Connected!");
	var sql = "SELECT * FROM login";
	con.query(sql, function(err, result, fields){
		if(err) throw err;
		//console.log(result);
		//console.log(result[1]);
		console.log(fields);
	});
});
*/
var name = 'aman';
var pass = 'singh';
var sql = 'SELECT * FROM login WHERE name = ? OR pass = ?';
con.query(sql, [name, pass], function (err, result) {
  if (err) throw err;
  console.log(result);
});

// Other important queries
// limit, offset
//"SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
