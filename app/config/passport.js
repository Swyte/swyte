'use strict';

let passport = require('passport');
let InstagramStrategy = require('passport-instagram').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let secrets = require('./secrets');
let Users = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy(secrets.facebook, (req, accessToken, refreshToken, profile, done) => {
    Users.findOne({
        phone: req.query.phone
    }, (err, existingUser) => {
        if (existingUser && existingUser.facebook) {
            // There's already an Facebook account associated with this user.
            req.flash('errors', {
                msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
            });
            done(err, existingUser);
        } else if (existingUser) {
            // User already exists but does not have their Facebook account
            // attached.
            existingUser.facebook = profile.id;
            existingUser.tokens.push({
                kind: 'facebook',
                accessToken: accessToken
            });
            
            user.profile.name = profile.displayName;
            user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.profile.location = (profile._json.location) ? profile._json.location.name : '';
            existingUser.save(err => {
                req.flash('info', {
                    msg: 'Facebook account has been linked.'
                });
                done(err, existingUser);
            });
        } else {
            var user = new Users();
            user.phone = req.body.phone;
            user.facebook = profile.id;
            user.tokens.push({
                kind: 'facebook',
                accessToken: accessToken
            });
            
            user.profile.name = profile.displayName;
            user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.profile.location = (profile._json.location) ? profile._json.location.name : '';
            user.save(err => {
                done(err, user);
            });
        }
    });
}));

/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy(secrets.instagram, function(req, accessToken, refreshToken, profile, done) {
    Users.findOne({
        phone: req.params.phone
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
            req.flash('errors', {
                msg: 'An account must be created first using Facebook.'
            });
            done(err);
        }
    });
}));

/**
 * Sign in with Twitter.
 */
passport.use(new TwitterStrategy(secrets.twitter, (req, accessToken, tokenSecret, profile, done) => {
    Users.findOne({
        phone: req.params.phone
    }, (err, existingUser) => {
        if (existingUser && existingUser.twitter) {
            // There's already an Twitter account associated with this user.
            req.flash('errors', {
                msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
            });
            done(err);
        } else if (existingUser) {
            // User already exists but does not have their Instagram account
            // attached.
            existingUser.twitter = profile.id;
            existingUser.tokens.push({
                kind: 'twitter',
                accessToken: accessToken
            });

            existingUser.save(function(err) {
                req.flash('info', {
                    msg: 'Twitter account has been linked.'
                });
                done(err, existingUser);
            });
        } else {
            req.flash('errors', {
                msg: 'An account must be created first using Facebook.'
            });
            done(err);
        }
    });
}));
