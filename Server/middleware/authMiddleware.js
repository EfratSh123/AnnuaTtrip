const jwt = require('jsonwebtoken');

/*Verify JWT token*/
module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }
        
        const cleanToken = token.replace('Bearer ', '');
        const verified = jwt.verify(token, 'SECRET_KEY');

        req.teacher = verified;
        next();
    
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token.'
        });
    }
};