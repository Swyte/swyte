/*global require, __dirname*/
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let flash = require('express-flash');
let config = require('./config/config');
let routes = require('./routes');

// Require other modules.
require('./config/passport');

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

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// view engine setup
app.set('views', (__dirname + '/views'));
app.set('view engine', 'jade');

app.get('/', routes.index);
app.get('/:label', routes.profile);
app.post('/text', routes.text);
app.get('/oauth', routes.oauth);
app.put('/phone', routes.phone);
app.get('/auth/facebook', routes.oauthCall('facebook'));
app.get('/auth/facebook/callback', routes.oauthCallback('facebook'));
app.listen(config.port);
