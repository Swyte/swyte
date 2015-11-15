'use strict';

let http = require('https');
let Users = require('../models/user.js');
let FB = require('fb');

exports.facebookGET = (req, res) => {
	Users.findOne({
		"profile.label": req.params.label
	}, function(err, user) {
		if (user && user.facebook) {
			FB.api("/me?access_token=CAACEdEose0cBAFebwqEJEZCZBA60vbUyvTknoJHyNUXPN0ZBxH9M6zNAqewHMKROwNHK2MklsqWoAeP6RoTAvuvwgAjqcs7XfKZBIoGPdqAwfzyXYJd7yy6PBkEI7JVLoZBNiMBCUinnWLBpsZCbEtzCZBG0Fw8ZAB647eZAZBVgphqiKi5Nxharmv8lievA9jJuKz0rCZBWq6NjCj15c6GtnBOBAVgELGfdgIZD", res => {
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
