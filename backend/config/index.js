// Database configuration (for future implementation)
export const dbConfig = {
    // PostgreSQL configuration
    postgres: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'novacoders',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },

    // MongoDB configuration (alternative)
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/novacoders',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};

// Email service configuration
export const emailConfig = {
    resend: {
        apiKey: process.env.RESEND_API_KEY,
        fromEmail: process.env.FROM_EMAIL || 'Nova Coders <onboarding@resend.dev>',
        replyTo: process.env.REPLY_TO_EMAIL || 'hello@novacoders.dev'
    },

    // Rate limiting for email sending
    rateLimit: {
        perSecond: 10, // emails per second
        perMinute: 100, // emails per minute
        perHour: 1000  // emails per hour
    }
};

// API configuration
export const apiConfig = {
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development',
    
    // CORS settings
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    },
    
    // Rate limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100 // per window
    },

    // Security
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        adminToken: process.env.ADMIN_TOKEN || 'admin-secret-token',
        tokenExpiry: '24h'
    }
};

// File storage configuration
export const storageConfig = {
    dataDirectory: process.env.DATA_DIR || './backend/data',
    backupDirectory: process.env.BACKUP_DIR || './backend/backups',
    
    // File paths
    files: {
        subscribers: 'subscribers.json',
        campaigns: 'campaigns.json',
        analytics: 'analytics.json'
    }
};

// Logging configuration
export const loggingConfig = {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './backend/logs/app.log',
    maxFiles: 5,
    maxSize: '10m'
};

export default {
    db: dbConfig,
    email: emailConfig,
    api: apiConfig,
    storage: storageConfig,
    logging: loggingConfig
};
