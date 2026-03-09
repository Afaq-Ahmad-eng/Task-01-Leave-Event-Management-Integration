import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const adminToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_TOKEN_KEY, { expiresIn: '30m' });
};

const adminRefreshToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: '3d' });
};

const verifyJWTToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Token verification error ", error);
        // return null;
    }
};

export { adminToken, adminRefreshToken, verifyJWTToken };