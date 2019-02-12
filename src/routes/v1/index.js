'use strict';
var express = require('express');

var userRoutes = require('../v1/UserRoute');

var router = express.Router();

// User Route
router.use('/user', userRoutes);

module.exports = router;