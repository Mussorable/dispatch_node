const User = require('../models/user');

const authToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const user = await User.findOne({where: {passwordToken: token}});

        if (!user) {
            res.status(401).json({message: 'Access denied. Invalid or expired token.'});
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while verifying the token',
            error: err.message
        });
    }
};

module.exports = authToken;