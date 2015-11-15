'use strict';

let http = require('https');
let Users = require('../models/user.js');
let FB = require('fb');
let async = require('async');

exports.facebookGET = (req, res, cb) => {
        Users.findOne({
                "profile.label": req.params.label
        }, function(err, user) {
                if (user && user.facebook) {
                	async.waterfall([
                		function(next) {
                			FB.api("/me?access_token=" + user.facebook, function(res) {
                				if (!res || res.error) {
	                                console.log(!res ? 'error occurred' : res.error);
	                                next(res.error || res);
                				} else {
                					next(null, res);
                				}
            				});
                		}, 
            			function(fbprofile, next) {
            				FB.api("/me/feed?access_token=" + user.facebook, function(res) {
        						if (!res || res.error) {
	                                console.log(!res ? 'error occurred' : res.error);
	                                next(res.error || res);
                				} else {
                					next(null, {
                						profile: fbprofile,
                						feed: res
                					});
                				}
        					});
            			}
           			],
            		function(err, result) {
            			if (err) {
            				console.log(err);
            				return cb(err);
            			}
            			return cb(result);
                	});
                } else {
                        return cb();
                }
        });
};