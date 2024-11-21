const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({message: 'Access denied. No token provided.'});

    try {
        const secretKey = process.env.JWT_SECRET;
        req.user = jwt.verify(token, secretKey);

        next();
    } catch (err) {
        return res.status(403).json({message: 'Access denied. Invalid token.'});
    }
};

module.exports = authToken;