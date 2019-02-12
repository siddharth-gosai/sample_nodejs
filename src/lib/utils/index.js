'use strict';
var _ = require('lodash');

exports.url = function (req) {
    return req.protocol + '://' + req.get('host');
};

var baseUrl = '';
exports.setBaseUrl = function (req) {
    baseUrl = exports.url(req);
};

exports.getBaseUrl = function () {
    return baseUrl;
};

exports.sendEmail = function (data, callback) {
    if (_.isEmpty(data.email)) {
        return next(Boom.notFound('Invalid email'));
    } else if (_.isEmpty(data.subject)) {
        return next(Boom.notFound('Invalid subject'));
    }
    // Send Email Code Will be Here
    return callback(null, {message: 'Email sent successfully'});
};