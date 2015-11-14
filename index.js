var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.post("/main", function(req, res) {
	console.log(req.body);
});

app.listen(3000);