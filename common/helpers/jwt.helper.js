const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privatePath = path.resolve(__dirname, '../../configs/private.key');
const publicPath = path.resolve(__dirname, '../../configs/public.key');
const privateKey = fs.readFileSync(privatePath, 'utf8');
const publicKey = fs.readFileSync(publicPath, 'utf8');

const { ErrorCode } = require('../enums');

// sign key
exports.generateToken = (data, options = {}) => {
    options = Object.assign({
        algorithm: 'RS256',
        expiresIn: 60 * 60 * 24 * 30 // 30 days
    }, options);
    const token = jwt.sign(data, privateKey, options);
    return token;
};

// verify key
exports.verifyToken = (token, options = {}) => {
    try {
        const verifiedData = jwt.verify(token, publicKey, options);
        return verifiedData;
    } catch (err) {
        if (err.name == 'TokenExpiredError') {
            console.error(err);
            throw new Error(ErrorCode.TokenIsExpired);
            
        }
        console.error(err);
        throw new Error(ErrorCode.TokenIsInvalid);
    }
};
