'use strict';

let express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send();
});

module.export = router;
