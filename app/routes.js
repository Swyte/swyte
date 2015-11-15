'use strict';
let wit = require('../wit');
let Users = require('./models/user');
let controllers = require('./controllers/controllers.js');

exports.index = function(req, res) {
    res.render('index', {
        title: 'Meow',
        message: 'Meow again'
    });
};

exports.oauth = function(req, res) {
    res.render('auth');
};

exports.profile = function(req, res) {
    controllers.facebookGET(req, res, function(user) {
        if (!user) {
            res.redirect('/');
        } else {
            res.render('profile', user);
        }
    });
};

exports.text = function(req, res) {
    console.log('poo' + JSON.stringify(req.body));
    Users.findOne({
        phone: req.body.From
    }, (err, user) => {
    	console.log("USER: " + user);
        if (!err && user) { // Found
            if (user.facebook === '') { // Account not yet attached
                console.log("No Facebook account found");
                res.send(`<Response><Message>Welcome back, we still need permission to access your Facebook account. https://swyte.xyz/oauth/#!/facebook/${req.body.From.replace("+","")}</Message></Response>`);
            } else { // Account found and Facebook attached
            	console.log("Hit ELSE");
                /* -----------------------------TEMPLATES ----------------------------- */
                wit(req.body.Body, function(err, response) {
                    if (!err && response) { // Handle templates, no error and response is valid
                        //console.log("Length: " + Object.keys(response.outcomes[0].entities).length);
                        //console.log("WIT RESPONSE: " + JSON.stringify(response));
                        console.log("USER: " + user);
                        if (Object.keys(response.outcomes[0].entities).length === 1) { // Only one item  
                            res.send("<Response><Message>You can check out your site at http://ngrok342.io/</Message></Response>");
                        } else if (Object.keys(response.outcomes[0].entities).length > 1) {
                            res.send("<Response><Message>Looks like you might have picked more than one template!</Message></Response>");
                        } else if (Object.keys(response.outcomes[0].entities).length < 1) {
                            res.send("<Response><Message>I didn't quite catch that, we have x, y and z templates available for use, for free.</Message></Response>");
                        }
                    }
                });
                /* -----------------------------TEMPLATES ----------------------------- */
            }
        } else { // Not found, register new user
            res.send(`<Response><Message>To get started, we need access to your Facebook account. https://swyte.xyz/oauth/#!/facebook/${req.body.From.replace("+","")}</Message></Response>`);
            var newuser = new Users({ phone: req.body.From });
            newuser.save(function (err) {
            	if(err) {
            		console.log("Error " + err);
            	}
            	console.log("New User: " + user);
            });
        }
    });
};

/**
 * OAuth provider call
 */
exports.oauthCall = function(strategy, scope) {
    return function(req, res, next) {
        // Set redirection path on session.
        // Do not redirect to a signin or signup page
        req.session.redirect_to = req.query.redirect_to;
        // Authenticate
        passport.authenticate(strategy, scope)(req, res, next);
    };
};

exports.oauthCallback = function(strategy) {
    return function(req, res, next) {
        // Pop redirect URL from session
        var sessionRedirectURL = req.session.redirect_to;
        delete req.session.redirect_to;

        passport.authenticate(strategy, function(err, user, redirectURL) {
            if (err) {
                console.log(err);
                return res.redirect('/authentication/signin?err=' + encodeURIComponent(err));
            }
            if (!user) {
                return res.redirect('/error.html');
            }
            req.login(user, function(err) {
                if (err) {
                    console.log(err);
                    return res.redirect('/error.html');
                }

                return res.redirect(redirectURL || sessionRedirectURL + '?success=true' || '/');
            });
        })(req, res, next);
    };
};

exports.phone = function(req, res) {
    Users.findOne({
        _id: req.user._id
    }, function(err, user) {
        if (err || !user) {

        } else {
            user.phone = req.body.phone;
            user.save();
        }
    });
};
