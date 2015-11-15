'use strict';

let http = require('https');
let Users = require('../models/user.js');
let FB = require('fb');

exports.facebookGET = (req, res) => {
	Users.findOne({
		_id: req.param.label
	}, function(err, user) {
		if (user && user.facebook) {
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
