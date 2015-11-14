/*global require, __dirname*/
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let config = require('../config');

var app = express();

// Connect to test database (hh for HackHarvard)
mongoose.connect(config.mongoUrl);

// Express MongoDB session storage
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookie: {
        maxAge: config.sessionCookie.maxAge,
        httpOnly: config.sessionCookie.httpOnly,
        secure: config.sessionCookie.secure && config.secure.ssl
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: config.sessionCollection
    })
}));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
}));

// parse application/json
app.use(bodyParser.json());

module.exports = app;

app.listen(3000);
