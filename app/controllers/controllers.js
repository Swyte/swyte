'use strict';

let http = require('https');
let Users = require('../models/user.js');
let FB = require('fb');

exports.facebookGET = (req, res, cb) => {
        Users.findOne({
                "profile.label": req.params.label
        }, function(err, user) {
                if (user && user.facebook) {
                        //http://graph.facebook.com/1681904084/picture?type=large
                        FB.api("/me/feed?access_token=CAACEdEose0cBAFQ0qFkCrfzU69F7LUNKcrzzZCuevuYVGLPu25tqzaYNinhk2hsuY3V1FWxMZAxoAbr7U6PWQJx6t0s0RFaZCZAjf9WCy3S6rnZCNnyw3dD77GG7rJjEqtUqZCrT3dxF6kAKEFBd4hk1ZBdDiw0rBhLCyZCzZCQzG3SlnZC5gkJiAKEKqp8ZACdZB5rLRZAK8xiyTBke087m9syb5QYbihwGSIv8ZD", res => {
                                if (!res || res.error) {
                                        console.log(!res ? 'error occurred' : res.error);
                                        return cb();
                                }
                                console.log(JSON.stringify(res));
                                return cb(res);
                        });
                        FB.api("/me?access_token=CAACEdEose0cBAFQ0qFkCrfzU69F7LUNKcrzzZCuevuYVGLPu25tqzaYNinhk2hsuY3V1FWxMZAxoAbr7U6PWQJx6t0s0RFaZCZAjf9WCy3S6rnZCNnyw3dD77GG7rJjEqtUqZCrT3dxF6kAKEFBd4hk1ZBdDiw0rBhLCyZCzZCQzG3SlnZC5gkJiAKEKqp8ZACdZB5rLRZAK8xiyTBke087m9syb5QYbihwGSIv8ZD", res => {
                                if (!res || res.error) {
                                        console.log(!res ? 'error occurred' : res.error);
                                        return cb();
                                }
                                console.log(JSON.stringify(res));
                                return cb(res);
                        });
                } else {
                        return cb();
                }
        });
};