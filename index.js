var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/hh'); // hackharvard

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
var sample = mongoose.model('users', {
        firstName: String,
        lastName: String,
        email: String,
        password: String
}); // Mongoose Schema

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
}));
// parse application/json
app.use(bodyParser.json())

app.post("/main", function(req, res) {
	console.log(req.body);
});

app.listen(3000);