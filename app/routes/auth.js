const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

// User login
router.post('/login', [
    body('username')
        .isLength({min: 3, max: 32})
        .withMessage('Username must be between 3 and 32 characters long')
        .custom(async (value) => {
            const existedUser = await User.findOne({where: {username: value}});
            if (!existedUser) {
                return Promise.reject('User not found');
            }
        }),
    body('password')
        .isLength({min: 6, max: 32})
        .withMessage('Password must be between 6 and 32 characters long')
], authController.login);

// User registration, hash password, generate token
router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .custom(async (value) => {
            const existedUser = await User.findOne({where: {email: value}});
            if (existedUser) {
                return Promise.reject('Email is already in use');
            }
        })
        .normalizeEmail(),
    body('username')
        .isLength({min: 3, max: 32})
        .withMessage('Username must be between 3 and 32 characters long')
        .custom(async (value) => {
            const existedUser = await User.findOne({where: {username: value}});
            if (existedUser) {
                return Promise.reject('Username is already in use');
            }
        }),
    body('password')
        .isLength({min: 6, max: 32})
        .withMessage('Password must be between 6 and 32 characters long'),
],
    authController.register);

module.exports = router;