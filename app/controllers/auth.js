const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const token = jwt.sign(
            {email, username},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        try {
            const user = new User({
                email,
                username,
                password: hashedPassword,
                passwordToken: token,
                passwordExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            });

            await user.save();

            res.status(201).json({message: 'User created successfully'});
        } catch (err) {
            return res.status(500).json({
                message: 'An error occurred while creating the user',
                error: err.message
            });
        }
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
        // Check is user exists
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid password'});
        }

        // Generate access token and send as httpCookie
        const token = jwt.sign(
            {email: user.email, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                email: user.email,
                name: user.username
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while logging in',
            error: err.message
        });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.status(200).json({message: 'User logged out successfully'});
};