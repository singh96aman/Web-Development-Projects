var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user : 'singh96aman@gmail.com',
		pass : '19aman96'
	}
});

var mailOptions = {
	from : 'singh96aman@gmail.com',
	to : 'singh96aman@gmail.com',
	subject : 'Sending email using Node js',
	text : 'This is sooooo good'
};

transporter.sendMail(mailOptions, function(error, info){
	if(error)
		console.log(error);
	else
		console.log('Email sent : '+info.response);
});