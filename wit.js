module.exports = function(text, callback) {
	var wit = require('node-wit');
	var fs = require('fs');
	var ACCESS_TOKEN = "2JXPAUQK7LV5XX6R5BJVGD5SNCYPFZUT";
    
	console.log("Sending text to Wit.AI " + text);
    
	wit.captureTextIntent(ACCESS_TOKEN, text, function(err, res) {
	    callback(err, res);
	});
};
