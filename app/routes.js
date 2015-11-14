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
				res.send("<Response><Message>Welcome back, we still need permission to access your Facebook account. https://9c137715.ngrok.io/auth/facebook</Message></Response>");
			} else { // Account found and Facebook attached
						   /* -----------------------------TEMPLATES ----------------------------- */
				wit(req.body.Body, function (err, response) {
					if(!err && response) { // Handle templates, no error and response is valid
						console.log("Length: " + Object.keys(response.outcomes[0].entities).length);
						console.log("WIT RESPONSE: " + JSON.stringify(response));
						if(Object.keys(response.outcomes[0].entities).length === 1){ // Only one item  
							res.send("<Response><Message>Great, I'm creating your website now.</Message></Response>");
						} else if(Object.keys(response.outcomes[0].entities).length > 1){
							res.send("<Response><Message>Looks like you might have picked more than one template!</Message></Response>");
						} else if(Object.keys(response.outcomes[0].entities).length < 1){
							res.send("<Response><Message>I didn't quite catch that, we have x, y and z templates available for use, for free.</Message></Response>");
						}
					}
				});
						  /* -----------------------------TEMPLATES ----------------------------- */
			}
		} else { // Not found, register new user
			res.send("<Response><Message>To get started, we need access to your Facebook account. https://9c137715.ngrok.io/auth/facebook</Message></Response>");
		}
	});
};

