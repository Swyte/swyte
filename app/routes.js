'use strict';
let wit = require('../wit');
let Users = require('./models/user');
exports.index = (req, res) => {
    res.render('index', {title: 'Meow', message: 'Meow again'});
};

exports.text = (req, res) => {
	Users.findOne({
		phone: req.body.From
	}, function (err, user){
		if(!err && user){ // Found
			if(user.facebook === '') { // Account not yet attached
				console.log("No Facebook account found");
				res.send("<Response><Message>Welcome back, we still need permission to access your Facebook account. https://fb.com/auth</Message></Response>");
			} else { // Account found and Facebook attached
				// Where all the code will go.
			}
		} else { // Not found, register new user
			var adduser = new Users({
				phone: req.body.From
			});
			adduser.save(function (err) {
				if(err) {
					console.log("Error " + err);
					res.send("<Response><Message>Shit, we ran into an error. Give this to a dev: " + err + "</Message></Response>");
				} else {
					console.log("Saved succesfully!");
					res.send("<Response><Message>Hey, to start things off we will need to get access to your Facebook account. https://fb.com/auth</Message></Response>");
				}
			});
		}
	});
    // wit(req.body.Body, function (err, res) {
    // 	if(!err){
    // 		console.log(res);
    // 	}
    // });
};
