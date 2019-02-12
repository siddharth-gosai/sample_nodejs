'use strict';

var debug = require('debug')('NE:UserService');
var Boom = require('boom');
var _ = require('lodash');

var utils = require('../lib/utils');
var UserModel = require('../models/UserModel');
var AppConstants = require('../constants/AppConstants');

exports.findById = function (req, res, next) {
    debug('Inside findById');
    var params = req.params;
    debug('params %o ', params);
    if (_.isEmpty(params.userId)) {
        return next(Boom.notFound('Invalid userId'));
    }
    debug('params.userId %o ', params.userId);
    var data = {
        id: params.userId
    };

    // UserModel.findById(data, function (error, document) {
    req.userStore = {id: params.userId, name: 'Dummy result'};
};

exports.validateRegister = function (req, res, next) {
    debug('Inside validateRegister');
    var params = req.body;
    if (_.isEmpty(params.email)) {
        return next(Boom.notFound('Please enter email'));
    } else if (_.isEmpty(params.password)) {
        return next(Boom.notFound('Please enter password'));
    }
    return next();
};

exports.insertUser = function (req, res, next) {
    debug('Inside insertUser');
    var params = req.body;

    var newUser = {};
    newUser.isEnable = true;
    newUser.isEmailVerified = false;
    newUser.email = params.email;
    newUser.password = params.password;
    newUser.id = 'auto-generate';

    // UserModel.create({newUser: data}, function (error, document)
    req.userStore = newUser;
    debug('req.userStore; ', req.userStore);
    return next();
};

exports.updateUser = function (req, res, next) {
    debug('Inside updateUser');
    var params = req.body;
    var data = {
        email: params.email
    };
    // UserModel.modify(data, function (error, document) {
    req.userStore = data;
    debug('req.userStore; ', req.userStore);
    return next();
};

exports.sendRegistrationEmail = function (req, res, next) {
    debug('Inside sendRegistrationEmail');
    var userStore = req.userStore;
    if (_.isEmpty(userStore)) {
        return next(Boom.newFound('User has been not registered'));
    }
    var data = {
        email: userStore.email,
        subject: AppConstants.EMAIL.REGISTER
    };
    utils.sendEmail(data, function (error, response) {
        if (!_.isEmpty(error)) {
            console.log('Inside error');
            return next(error);
        }
        debug('response %o ', response);
        return next();
    });
};

exports.deleteUser = function (req, res, next) {
    debug('Inside deleteUser');
    var userStore = req.userStore;
    debug('userStore ', userStore);
    if (_.isEmpty(userStore)) {
        return next(Boom.newFound('User has been not found'));
    }
    var data = {
        id: userStore.id
    };
    // UserModel.delete(data, function (error, document) {
    req.userStore = data;
    debug('req.userStore; ', req.userStore);
    return next();
};