'use strict';

var debug = require('debug')('NE:UserController');
var Boom = require('boom');
var _ = require('lodash');

exports.appUserData = function (req, res, next) {
    debug('Inside appUserData');
    req.data = req.userStore;
    return next();
};

exports.appNewUser = function (req, res, next) {
    debug('Inside appNewUser');
    debug('req.userStore; ', req.userStore);
    req.data = req.userStore;
    return next();
};