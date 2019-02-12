'use strict';

var express = require('express');
var router = express.Router();
var userController = require('../../controllers/UserController');
var userService = require('../../services/UserService');

/**
 * Account Register and Generate Register Code
 */
router.post('/register/app', [
    userService.validateRegister,
    userService.insertUser,
    userService.sendRegistrationEmail,
    userController.appNewUser
]);

/**
 * Search the User Detail
 */
router.get('/search/:userId', [
    userService.findById,
    userController.appUserData
]);

/**
 * Update the User By Id
 */
router.put('/:userId', [
    userService.findById,
    userService.updateUser,
    userController.appUserData
]);

/**
 * Remove the User By Id
 */
router.delete('/:userId', [
    userService.findById,
    userService.deleteUser,
    userController.appUserData
]);

module.exports = router;