'use strict';

let http = require('https');
let Users = require('../models/user.js');
let FB = require('fb');

exports.facebookGET = (req, res) => {
	console.dir(req.params.label);
	Users.findOne({
		"profile.label": req.params.label
	}, function(err, user) {
		if (user && user.facebook) {
			console.log("User inner " + user);
			FB.api(user.id, res => {
				if (!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
					return null;
				} else {
					console.log(res.id);
					console.log(res.name);
					return { user:res };
				}
			});
		} else {
			console.log('meow');
			console.log(err);
			return null;
		}
	});
};
