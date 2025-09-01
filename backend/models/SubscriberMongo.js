import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(email) {
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return emailRegex.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    firstName: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed', 'bounced'],
        default: 'active'
    },
    source: {
        type: String,
        enum: ['website', 'api', 'import', 'manual'],
        default: 'website'
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: {
        type: Date,
        default: null
    },
    lastEmailSent: {
        type: Date,
        default: null
    },
    emailsSent: {
        type: Number,
        default: 0
    },
    bounceCount: {
        type: Number,
        default: 0
    },
    metadata: {
        ipAddress: String,
        userAgent: String,
        referrer: String,
        utmSource: String,
        utmMedium: String,
        utmCampaign: String,
        tags: [String]
    },
    preferences: {
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'weekly'
        },
        topics: [{
            type: String,
            enum: ['tech', 'coding', 'design', 'career', 'events']
        }]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscribedAt: -1 });
subscriberSchema.index({ source: 1 });

// Virtual for full name (if we add last name later)
subscriberSchema.virtual('fullName').get(function() {
    return this.firstName || this.email.split('@')[0];
});

// Instance methods
subscriberSchema.methods.updateStatus = function(newStatus) {
    this.status = newStatus;
    if (newStatus === 'unsubscribed') {
        this.unsubscribedAt = new Date();
    }
    return this.save();
};

subscriberSchema.methods.incrementEmailCount = function() {
    this.emailsSent += 1;
    this.lastEmailSent = new Date();
    return this.save();
};

subscriberSchema.methods.addBounce = function() {
    this.bounceCount += 1;
    if (this.bounceCount >= 3) {
        this.status = 'bounced';
    }
    return this.save();
};

// Static methods
subscriberSchema.statics.findActiveSubscribers = function() {
    return this.find({ status: 'active' });
};

subscriberSchema.statics.getStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                active: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
                    }
                },
                unsubscribed: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'unsubscribed'] }, 1, 0]
                    }
                },
                bounced: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'bounced'] }, 1, 0]
                    }
                }
            }
        }
    ]);

    // Calculate recent growth (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentGrowth = await this.countDocuments({
        subscribedAt: { $gte: thirtyDaysAgo }
    });

    const baseStats = stats[0] || { total: 0, active: 0, unsubscribed: 0, bounced: 0 };
    
    return {
        ...baseStats,
        recentGrowth,
        conversionRate: baseStats.total > 0 ? ((baseStats.active / baseStats.total) * 100).toFixed(2) : 0
    };
};

subscriberSchema.statics.getGrowthData = async function(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return await this.aggregate([
        {
            $match: {
                subscribedAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: '$subscribedAt'
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
};

// Pre-save middleware to extract firstName from email if not provided
subscriberSchema.pre('save', function(next) {
    if (!this.firstName && this.email) {
        const emailPart = this.email.split('@')[0];
        const namePart = emailPart.split('.')[0];
        this.firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    next();
});

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
