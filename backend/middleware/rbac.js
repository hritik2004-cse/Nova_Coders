import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// Verify JWT token and attach user to request
export const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        let token = req.headers.authorization?.split(' ')[1];
        
        // Also check cookies for browser requests
        if (!token && req.cookies?.authToken) {
            token = req.cookies.authToken;
        }
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }
        
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Get user from database with fresh permissions
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }
        
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated.'
            });
        }
        
        if (user.isLocked) {
            return res.status(401).json({
                success: false,
                message: 'Account is temporarily locked. Please try again later.'
            });
        }
        
        // Attach user to request
        req.user = user;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Token verification failed.',
            error: error.message
        });
    }
};

// Middleware to check if user has specific role
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.'
            });
        }
        
        // Convert single role to array
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        
        // Super admin can access everything
        if (req.user.role === 'super_admin') {
            return next();
        }
        
        // Check if user has required role
        if (roles.includes(req.user.role)) {
            return next();
        }
        
        return res.status(403).json({
            success: false,
            message: `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}`
        });
    };
};

// Middleware to check if user has specific permission
export const requirePermission = (requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.'
            });
        }
        
        // Convert single permission to array
        const permissions = Array.isArray(requiredPermissions) 
            ? requiredPermissions 
            : [requiredPermissions];
        
        // Super admin has all permissions
        if (req.user.role === 'super_admin') {
            return next();
        }
        
        // Check if user has all required permissions
        const hasAllPermissions = permissions.every(permission => 
            req.user.hasPermission(permission)
        );
        
        if (hasAllPermissions) {
            return next();
        }
        
        return res.status(403).json({
            success: false,
            message: `Access denied. Required permissions: ${permissions.join(', ')}`
        });
    };
};

// Middleware to check if user has any of the specified permissions
export const requireAnyPermission = (permissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.'
            });
        }
        
        // Super admin has all permissions
        if (req.user.role === 'super_admin') {
            return next();
        }
        
        // Check if user has any of the required permissions
        const hasAnyPermission = req.user.hasAnyPermission(permissions);
        
        if (hasAnyPermission) {
            return next();
        }
        
        return res.status(403).json({
            success: false,
            message: `Access denied. Required any of these permissions: ${permissions.join(', ')}`
        });
    };
};

// Middleware for admin access (admin or super_admin)
export const requireAdmin = requireRole(['admin', 'super_admin']);

// Middleware for moderator access or higher
export const requireModerator = requireRole(['moderator', 'admin', 'super_admin']);

// Middleware for member access or higher
export const requireMember = requireRole(['member', 'moderator', 'admin', 'super_admin']);

// Middleware to check if user owns resource or has permission
export const requireOwnershipOrPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.'
            });
        }
        
        // Super admin can access everything
        if (req.user.role === 'super_admin') {
            return next();
        }
        
        // Check if user has the required permission
        if (req.user.hasPermission(permission)) {
            return next();
        }
        
        // Check if user owns the resource (userId from params)
        const resourceUserId = req.params.userId || req.params.id;
        if (resourceUserId && resourceUserId === req.user._id.toString()) {
            return next();
        }
        
        return res.status(403).json({
            success: false,
            message: 'Access denied. You can only access your own resources or need specific permissions.'
        });
    };
};

// Middleware for API rate limiting per role
export const rateLimitByRole = (req, res, next) => {
    if (!req.user) {
        return next();
    }
    
    // Set rate limits based on user role
    const rateLimits = {
        guest: 10,        // 10 requests per minute
        intern: 30,       // 30 requests per minute
        member: 60,       // 60 requests per minute
        moderator: 120,   // 120 requests per minute
        admin: 300,       // 300 requests per minute
        super_admin: 1000 // 1000 requests per minute
    };
    
    req.rateLimit = rateLimits[req.user.role] || rateLimits.guest;
    next();
};

// Middleware to log access attempts
export const logAccess = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const userInfo = req.user ? `${req.user.username} (${req.user.role})` : 'Anonymous';
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${method} ${url} - User: ${userInfo} - IP: ${ip}`);
    next();
};

// Comprehensive middleware combining authentication and authorization
export const authorize = (options = {}) => {
    const {
        roles = [],
        permissions = [],
        anyPermission = false,
        allowOwner = false,
        logAccess: shouldLog = true
    } = options;
    
    const middlewares = [];
    
    // Add logging if requested
    if (shouldLog) {
        middlewares.push(logAccess);
    }
    
    // Always authenticate first
    middlewares.push(authenticateToken);
    
    // Add role checking if specified
    if (roles.length > 0) {
        middlewares.push(requireRole(roles));
    }
    
    // Add permission checking if specified
    if (permissions.length > 0) {
        if (anyPermission) {
            middlewares.push(requireAnyPermission(permissions));
        } else {
            middlewares.push(requirePermission(permissions));
        }
    }
    
    // Add ownership checking if specified
    if (allowOwner && permissions.length > 0) {
        middlewares.push(requireOwnershipOrPermission(permissions[0]));
    }
    
    return middlewares;
};

const rbacMiddleware = {
    authenticateToken,
    requireRole,
    requirePermission,
    requireAnyPermission,
    requireAdmin,
    requireModerator,
    requireMember,
    requireOwnershipOrPermission,
    rateLimitByRole,
    logAccess,
    authorize
};

export default rbacMiddleware;
