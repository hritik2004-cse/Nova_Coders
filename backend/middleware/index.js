// CORS Middleware
export const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

// JSON Body Parser Middleware
export const jsonParserMiddleware = (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                req.body = JSON.parse(body);
                next();
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid JSON in request body'
                });
            }
        });
    } else {
        req.body = {};
        next();
    }
};

// Rate Limiting Middleware
const rateLimitStore = new Map();

export const rateLimitMiddleware = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;
        
        // Clean old entries
        for (const [key, value] of rateLimitStore.entries()) {
            if (value.timestamp < windowStart) {
                rateLimitStore.delete(key);
            }
        }
        
        // Check current client
        const clientRequests = rateLimitStore.get(clientId) || { count: 0, timestamp: now };
        
        if (clientRequests.timestamp < windowStart) {
            // Reset if outside window
            clientRequests.count = 1;
            clientRequests.timestamp = now;
        } else {
            // Increment if within window
            clientRequests.count++;
        }
        
        rateLimitStore.set(clientId, clientRequests);
        
        if (clientRequests.count > maxRequests) {
            return res.status(429).json({
                success: false,
                error: 'Too many requests. Please try again later.',
                resetTime: new Date(clientRequests.timestamp + windowMs).toISOString()
            });
        }
        
        // Add rate limit headers
        res.header('X-RateLimit-Limit', maxRequests);
        res.header('X-RateLimit-Remaining', Math.max(0, maxRequests - clientRequests.count));
        res.header('X-RateLimit-Reset', new Date(clientRequests.timestamp + windowMs).toISOString());
        
        next();
    };
};

// Error Handler Middleware
export const errorHandlerMiddleware = (error, req, res, next) => {
    console.error('API Error:', error);
    
    res.status(error.status || 500).json({
        success: false,
        error: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

// Request Logger Middleware
export const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    const { method, url, ip } = req;
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        
        console.log(`${method} ${url} - ${statusCode} - ${duration}ms - ${ip}`);
    });
    
    next();
};

// Authentication Middleware (for admin routes)
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'Authorization header required'
        });
    }
    
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token required'
        });
    }
    
    // Verify token (implement your JWT verification here)
    try {
        // For now, just check if it's a simple admin token
        if (token !== process.env.ADMIN_TOKEN) {
            throw new Error('Invalid token');
        }
        
        req.user = { role: 'admin' };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};
