import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Development', 'Education', 'Community', 'Other'],
        default: 'Other'
    },
    description: {
        type: String,
        required: true
    },
    
    // Icon and Visual
    icon: {
        type: String,
        required: true,
        default: 'FaCode' // Default React Icon name
    },
    iconColor: {
        type: String,
        default: '#3B82F6' // Default blue color
    },
    
    // Features array
    features: [{
        type: String,
        required: true
    }],
    
    // Status Management
    status: {
        type: String,
        enum: ['active', 'inactive', 'coming-soon'],
        default: 'inactive'
    },
    statusText: {
        type: String,
        default: 'Currently Inactive'
    },
    
    // Button Configuration
    buttonText: {
        type: String,
        default: 'Learn More'
    },
    buttonIcon: {
        type: String,
        default: 'FaArrowRight'
    },
    buttonAction: {
        type: String,
        enum: ['link', 'modal', 'contact', 'disabled'],
        default: 'disabled'
    },
    buttonUrl: {
        type: String,
        default: ''
    },
    
    // SEO and Meta
    slug: {
        type: String,
        unique: true,
        required: true
    },
    metaDescription: {
        type: String,
        maxlength: 160
    },
    tags: [{
        type: String
    }],
    
    // Order and Display
    displayOrder: {
        type: Number,
        default: 0
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
    // Admin fields
    createdBy: {
        type: String,
        default: 'admin'
    },
    lastModifiedBy: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true // This automatically manages createdAt and updatedAt
});

// Indexes for better performance
serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ displayOrder: 1 });
serviceSchema.index({ isVisible: 1 });

// Pre-save middleware to update the updatedAt timestamp
serviceSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Virtual for full URL (if needed)
serviceSchema.virtual('fullUrl').get(function() {
    return `/services/${this.slug}`;
});

// Method to toggle status
serviceSchema.methods.toggleStatus = function() {
    this.status = this.status === 'active' ? 'inactive' : 'active';
    this.statusText = this.status === 'active' ? 'Currently Active' : 'Currently Inactive';
    return this.save();
};

// Static method to get active services
serviceSchema.statics.getActiveServices = function() {
    return this.find({ 
        status: 'active', 
        isVisible: true 
    }).sort({ displayOrder: 1 });
};

// Static method to get services by category
serviceSchema.statics.getByCategory = function(category) {
    return this.find({ 
        category: category,
        isVisible: true 
    }).sort({ displayOrder: 1 });
};

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
