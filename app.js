var express = require('express');
var app = express();
var authenticated = false;
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  port: 3306
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//connection.connect();

connection.query('SELECT * from manufacturing_database.parts', function(err, rows, fields) {
  if (!err)
    console.log('Connection To "parts" Successful');
  else
    console.log('Error while performing Query.');
});

connection.query('SELECT * from manufacturing_database.machine', function(err, rows, fields) {
	  if (!err)
	    console.log('Connection To "machine" Successful');
	  else
	    console.log('Error while performing Query.');
	});

//connection.end();
// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});


app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/style',  express.static(__dirname + '/style'));

app.use('/entries',  express.static(__dirname + '/entries'));

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});
});


app.get('/showSignInPage',function(req,res){
	if (!authenticated){
		res.sendFile('signin.html',{'root': __dirname + '/templates'});
	}
	if (authenticated){
		res.sendFile('loggedin.html', {'root':__dirname + '/templates'});
	}

});
app.get('/showSignInPageretry',function(req,res){
    res.sendFile('signinretry.html',{'root': __dirname + '/templates'});
});

app.get('/partsRequest',function(req,res){
	if(authenticated){
		res.sendFile('partsRequest.html',{'root':__dirname + '/templates'})
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/message',function(req,res){
    res.sendFile('message.html',{'root': __dirname + '/templates'});
});

app.get('/loggedin',function(req,res){
    if(authenticated){
        res.sendFile('loggedin.html',{'root': __dirname + '/templates'});
    } else {
    		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
    }
});

app.get('/machines',function(req,res){
    if(authenticated){
        res.sendFile('machines.html',{'root': __dirname + '/templates'});
    } else {
    		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
    }
});

app.get('/manufacture',function(req,res){
    if(authenticated){
        res.sendFile('manufacture.html',{'root': __dirname + '/templates'});
    } else {
    		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
    }
});

app.get('/showMachines', function(req, res){
	if(authenticated){
		connection.query('SELECT * FROM manufacturing_database.machine', function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/showParts', function(req, res){
	if(authenticated){
		connection.query('SELECT * FROM manufacturing_database.parts', function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/items/?:productID&?:quantity', function(req, res){
	// This API call is stubbed out. This API call will go to the Inventory silo
	// to request parts. A JSON object of {bool : "True"} or {bool: "False"} will
	// be returned indicating successful request.
	if(authenticated){
		console.log("Product ID", req.params.productID)
		console.log("Quantity", req.params.quantity)
		var quantity = req.params.quantity;
		testData = {bool:"True"};
		var string=JSON.stringify(testData);
		res.json(testData);
	
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}
});

app.post('/searchMachines', function(req, res){
	if(authenticated){
		var searchText = req.body.searchText;
		var searchOption = req.body.searchOption;
		var selectString = 'SELECT * FROM manufacturing_database.machine WHERE '+req.body.searchOption+' = "'+req.body.searchText+'" ';
		connection.query(selectString, function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.post('/searchParts', function(req, res){
	if(authenticated){
		var searchText = req.body.searchText;
		var searchOption = req.body.searchOption;
		var selectString = 'SELECT * FROM manufacturing_database.parts WHERE '+req.body.searchOption+' = "'+req.body.searchText+'" ';
		connection.query(selectString, function(err,results){
		if(err) throw err;
		res.send(results);
	});
	}
	else{
		res.sendFile('notloggedin.html', {'root' :__dirname + '/templates'})
	}

});

app.get('/showLogoutSuccess',function(req,res){

	res.sendFile('logoutsuccess.html',{'root':__dirname + '/templates'})
	authenticated = false;

});

app.post('/myaction', function(req, res) {
	console.log('req.body');
	console.log(req.body);
	var record = {fullName:req.body.fullName, email:req.body.email, pass:req.body.pass,
		title:req.body.title, department:req.body.searchOption, salary:req.body.salary,
		phoneNum:req.body.phoneNum, stat:req.body.stat, address: req.body.address};

	//connection.connect();
	connection.query('INSERT INTO hr_database.Employees SET ?', record, function(err,res){
	  	if(err) throw err;
		console.log('Last record insert id:', res.insertId);

	});

	res.redirect('/message');
	//connection.end();

	res.end();
});


app.post('/verifyuser', function(req,res){
	console.log('checking user in database');
	console.log(req.body);
	var selectString = 'SELECT COUNT(email) FROM hr_database.employees WHERE email="'+req.body.email+'" AND pass="'+req.body.pass+'" ';

	connection.query(selectString, function(err, results) {

        console.log(results);
        var string=JSON.stringify(results);
        console.log(string);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
			res.redirect('/loggedin');
			authenticated = true;
	    } else {
        	res.redirect('/showSignInPageretry');
        }
});

});

