'use strict';

var app = require('./app.js');

app.get('/', (req, res) => {
    res.status(200).send();
});
