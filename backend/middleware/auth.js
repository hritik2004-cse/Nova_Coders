import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT secret (you should put this in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // We'll generate this

// Default admin credentials - MUST be changed in production
const DEFAULT_ADMIN = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'CHANGE_THIS_PASSWORD'
};

// Generate password hash for admin
export const generatePasswordHash = async (password) => {
    return await bcrypt.hash(password, 12);
};

// Verify password
export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: '24h' // Token expires in 24 hours
    });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Middleware to protect admin routes
export const authenticateAdmin = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }
        
        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token.'
            });
        }
        
        // Add user info to request
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Token verification failed.',
            error: error.message
        });
    }
};

// Admin login function
export const adminLogin = async (username, password) => {
    try {
        // Check username
        if (username !== ADMIN_USERNAME) {
            return { success: false, message: 'Invalid credentials' };
        }
        
        // Get stored password hash or use default
        let storedHash = ADMIN_PASSWORD_HASH;
        if (!storedHash) {
            // Generate hash for default password (first time setup)
            storedHash = await generatePasswordHash(DEFAULT_ADMIN.password);
            console.log('⚠️  Using default admin password. Please change it!');
            console.log('⚠️  Set ADMIN_PASSWORD_HASH in your .env file');
        }
        
        // Verify password
        const isValidPassword = await verifyPassword(password, storedHash);
        if (!isValidPassword) {
            return { success: false, message: 'Invalid credentials' };
        }
        
        // Generate token
        const token = generateToken({
            username: username,
            role: 'admin',
            loginTime: new Date()
        });
        
        return {
            success: true,
            token: token,
            user: {
                username: username,
                role: 'admin'
            }
        };
        
    } catch (error) {
        return {
            success: false,
            message: 'Login failed',
            error: error.message
        };
    }
};

// Middleware for Next.js API routes
export const withAuth = (handler) => {
    return async (req, res) => {
        try {
            // Get token from header or cookie
            let token = req.headers.authorization?.split(' ')[1];
            
            // Also check cookies for browser requests
            if (!token && req.cookies?.adminToken) {
                token = req.cookies.adminToken;
            }
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. Please login.'
                });
            }
            
            // Verify token
            const decoded = verifyToken(token);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token. Please login again.'
                });
            }
            
            // Add user to request
            req.user = decoded;
            
            // Call the original handler
            return handler(req, res);
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Authentication error',
                error: error.message
            });
        }
    };
};

const authModule = {
    generatePasswordHash,
    verifyPassword,
    generateToken,
    verifyToken,
    authenticateAdmin,
    adminLogin,
    withAuth
};

export default authModule;
