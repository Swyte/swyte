'use strict';

let passport = require('passport');
let InstagramStrategy = require('passport-instagram').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let secrets = require('./config/secrets');
let Users = require('./models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy(secrets.instagram, function(req, accessToken, refreshToken, profile, done) {
    Users.findOne({
        phone: req.body.phone
    }, (err, existingUser) => {
        if (existingUser && existingUser.instagram) {
            req.flash('errors', {
                msg: 'There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
            });
            // There's already an Instagram account associated with this user.
            done(err);
        } else if (existingUser) {
            // User already exists but does not have their Instagram account
            // attached.
            existingUser.instagram = profile.id;
            existingUser.tokens.push({
                kind: 'instagram',
                accessToken: accessToken
            });

            existingUser.save(function(err) {
                req.flash('info', {
                    msg: 'Instagram account has been linked.'
                });
                done(err, existingUser);
            });
        } else {
            var user = new Users();
            user.phone = req.body.phone;
            user.instagram = profile.id;
            user.tokens.push({
                kind: 'instagram',
                accessToken: accessToken
            });
            user.profile.name = profile.displayName;
            user.profile.picture = profile._json.data.profile_picture;
            user.save(function(err) {
                done(err, user);
            });
        }
    });
}));

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
    if (req.user) {
        User.findOne({
            facebook: profile.id
        }, function(err, existingUser) {
            if (existingUser) {
                req.flash('errors', {
                    msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
                });
                done(err);
            } else {
                User.findById(req.user.id, function(err, user) {
                    user.facebook = profile.id;
                    user.tokens.push({
                        kind: 'facebook',
                        accessToken: accessToken
                    });
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.save(function(err) {
                        req.flash('info', {
                            msg: 'Facebook account has been linked.'
                        });
                        done(err, user);
                    });
                });
            }
        });
    } else {
        User.findOne({
            facebook: profile.id
        }, function(err, existingUser) {
            if (existingUser) return done(null, existingUser);
            User.findOne({
                email: profile._json.email
            }, function(err, existingEmailUser) {
                if (existingEmailUser) {
                    req.flash('errors', {
                        msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
                    });
                    done(err);
                } else {
                    var user = new User();
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({
                        kind: 'facebook',
                        accessToken: accessToken
                    });
                    user.profile.name = profile.displayName;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                    user.save(function(err) {
                        done(err, user);
                    });
                }
            });
        });
    }
}));

/**
 * Sign in with Twitter.
 */

passport.use(new TwitterStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
    if (req.user) {
        User.findOne({
            twitter: profile.id
        }, function(err, existingUser) {
            if (existingUser) {
                req.flash('errors', {
                    msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
                });
                done(err);
            } else {
                User.findById(req.user.id, function(err, user) {
                    user.twitter = profile.id;
                    user.tokens.push({
                        kind: 'twitter',
                        accessToken: accessToken,
                        tokenSecret: tokenSecret
                    });
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.location = user.profile.location || profile._json.location;
                    user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
                    user.save(function(err) {
                        req.flash('info', {
                            msg: 'Twitter account has been linked.'
                        });
                        done(err, user);
                    });
                });
            }
        });

    } else {
        User.findOne({
            twitter: profile.id
        }, function(err, existingUser) {
            if (existingUser) return done(null, existingUser);
            var user = new User();
            // Twitter will not provide an email address.  Period.
            // But a person’s twitter username is guaranteed to be unique
            // so we can "fake" a twitter email address as follows:
            user.email = profile.username + "@twitter.com";
            user.twitter = profile.id;
            user.tokens.push({
                kind: 'twitter',
                accessToken: accessToken,
                tokenSecret: tokenSecret
            });
            user.profile.name = profile.displayName;
            user.profile.location = profile._json.location;
            user.profile.picture = profile._json.profile_image_url_https;
            user.save(function(err) {
                done(err, user);
            });
        });
    }
}));
