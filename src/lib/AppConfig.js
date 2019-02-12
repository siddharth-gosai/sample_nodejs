'use strict';

var debug = require('debug')('NE:AppConfig');
var _ = require('lodash');
var Boom = require('boom');
var utils = require('./utils');

exports.trimParams = function (req, res, next) {
    debug('Inside trimParams');
    debug('API : %o', utils.url(req) + req.url);
    debug('req.method : %o ', req.method);
    if (req.method === 'OPTIONS') {
        req.data = {message: true};
    }
    // Trim query and post parameters
    _.each(req.body, function (value, key) {
        if ((_.isString(value) && !_.isEmpty(value))) {
            req.body[key] = value.trim();
        }
    });

    _.each(req.query, function (value, key) {
        if ((_.isString(value) && !_.isEmpty(value))) {
            req.query[key] = value.trim();
        }
    });
    debug('req.body : %o ', req.body);
    debug('req.query : %o ', req.query);

    utils.setBaseUrl(req);
    return next();
};

exports.handleSuccess = function (req, res, next) {
    //debug('Inside handleSuccess');
    if (req.data === undefined) {
        debug('Return from undefined req.data.');
        debug('It may be due to Request URL or METHOD did not match.');
        return next();
    }
    var resObject = req.data || [];

    debug('Success response :: ');
    debug(resObject);
    debug('----------------------------------------------------------------------------------- ');
    return res.json(resObject);
};

exports.handle404 = function (req, res, next) {
    debug('Inside handle404');
    return next(Boom.notFound('Invalid request ' + utils.url(req) + req.url));
};

exports.handleError = function (err, req, res, next) {
    //debug('Inside handleError');
    if (!err) {
        return next();
    }
    var errorResponse = {};
    if (err.output && err.output.payload) {
        errorResponse = {
            stack: err.stack,
            error: err.output.payload.message,
            message: err.output.payload.error,
            statusCode: err.output.payload.statusCode || 500
        };
    } else {
        errorResponse = {
            stack: err.stack,
            error: err.error || err.type || err.message,
            message: err.message,
            statusCode: err.statusCode || 500
        };
    }

    debug('Error stack :: ');
    debug(errorResponse.stack);
    debug('----------------------------------------------------------------------------------- ');
    return res.status(errorResponse.statusCode).json(errorResponse);
};
