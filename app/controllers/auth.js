const {validationResult} = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }

    const {email, username, password} = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate a token
        crypto.randomBytes(32,  async (err, buffer) => {
            if (err) {
                return res.status(500).json({
                    errors: [{message: 'Error generating token'}]
                });
            }

            const token = buffer.toString('hex');

            try {
                const user = new User({
                    email,
                    username,
                    password: hashedPassword,
                    passwordToken: token,
                    passwordExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
                });

                await user.save();

                res.status(201).json({
                    message: 'User created successfully',
                    token
                });
            } catch (err) {
                return res.status(500).json({
                    message: 'An error occurred while creating the user',
                    error: err.message
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while hashing the password',
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
    }

    const {username, password} = req.body;

    try {
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const currentTime = new Date();
        if (user.passwordExpiration < currentTime) {
            try {
                crypto.randomBytes(32,  async (err, buffer) => {
                   if (err) {
                       return res.status(500).json({
                           errors: [{message: 'Error generating token'}]
                       });
                   }

                   user.passwordToken = buffer.toString('hex');
                   user.passwordExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
                   await user.save();
                });
            } catch (err) {
                return res.status(500).json({
                    message: 'An error occurred while logging in',
                    error: err.message
                });
            }
        }

        res.status(200).json({
            message: 'User logged in successfully',
            token: user.passwordToken
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while logging in',
            error: err.message
        });
    }
};