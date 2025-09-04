import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    
    // Profile Information
    profilePicture: {
        type: String, // URL to profile image
        default: ''
    },
    bio: {
        type: String,
        maxlength: 500,
        default: ''
    },
    
    // Member Details
    membershipType: {
        type: String,
        enum: ['Core Team', 'Developer', 'Designer', 'Project Manager', 'Content Creator', 'Marketing', 'Community Manager', 'Mentor', 'Advisor'],
        required: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        enum: ['Development', 'Design', 'Marketing', 'Operations', 'HR', 'Finance', 'Content', 'Community'],
        required: true
    },
    
    // Professional Information
    skills: [{
        name: String,
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        }
    }],
    experience: {
        years: {
            type: Number,
            min: 0,
            default: 0
        },
        previousCompanies: [{
            name: String,
            role: String,
            duration: String
        }]
    },
    education: {
        degree: String,
        field: String,
        institution: String,
        graduationYear: Number
    },
    
    // Membership Status
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave', 'Alumni'],
        default: 'Active'
    },
    membershipLevel: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
        default: 'Bronze'
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    // Access and Permissions
    permissions: {
        canAccessAdmin: {
            type: Boolean,
            default: false
        },
        canManageProjects: {
            type: Boolean,
            default: false
        },
        canManageMembers: {
            type: Boolean,
            default: false
        },
        canCreateContent: {
            type: Boolean,
            default: true
        }
    },
    
    // Current Projects and Contributions
    currentProjects: [{
        name: String,
        role: String,
        startDate: Date,
        status: String
    }],
    contributions: {
        projectsCompleted: {
            type: Number,
            default: 0
        },
        articlesWritten: {
            type: Number,
            default: 0
        },
        mentoringHours: {
            type: Number,
            default: 0
        },
        eventsOrganized: {
            type: Number,
            default: 0
        }
    },
    
    // Social and Contact Information
    socialMedia: {
        github: String,
        linkedin: String,
        twitter: String,
        portfolio: String,
        behance: String,
        dribbble: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    
    // Availability and Preferences
    availability: {
        hoursPerWeek: {
            type: Number,
            min: 0,
            max: 168,
            default: 10
        },
        timezone: String,
        preferredWorkTime: String,
        workingDays: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }]
    },
    
    // Performance and Recognition
    performance: {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 3
        },
        reviews: [{
            date: Date,
            reviewer: String,
            rating: Number,
            comment: String
        }],
        badges: [{
            name: String,
            description: String,
            earnedDate: Date,
            icon: String
        }]
    },
    
    // Administrative
    isActive: {
        type: Boolean,
        default: true
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    },
    tags: [{
        type: String,
        trim: true
    }],
    
    // Events and Activities
    eventsAttended: [{
        name: String,
        date: Date,
        type: String,
        role: String
    }],
    certifications: [{
        name: String,
        issuer: String,
        issuedDate: Date,
        expiryDate: Date,
        certificateUrl: String
    }]
}, {
    timestamps: true
});

// Indexes for better performance
memberSchema.index({ email: 1 });
memberSchema.index({ status: 1 });
memberSchema.index({ membershipType: 1 });
memberSchema.index({ department: 1 });
memberSchema.index({ joinDate: 1 });

// Virtual for full name
memberSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for membership duration
memberSchema.virtual('membershipDuration').get(function() {
    const now = new Date();
    const joined = new Date(this.joinDate);
    const diffTime = Math.abs(now - joined);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
});

// Method to calculate contribution score
memberSchema.methods.calculateContributionScore = function() {
    const weights = {
        projectsCompleted: 10,
        articlesWritten: 5,
        mentoringHours: 2,
        eventsOrganized: 15
    };
    
    return (
        this.contributions.projectsCompleted * weights.projectsCompleted +
        this.contributions.articlesWritten * weights.articlesWritten +
        this.contributions.mentoringHours * weights.mentoringHours +
        this.contributions.eventsOrganized * weights.eventsOrganized
    );
};

// Static method to get active members
memberSchema.statics.getActiveMembers = function() {
    return this.find({ 
        status: 'Active', 
        isActive: true 
    }).sort({ joinDate: -1 });
};

// Static method to get members by department
memberSchema.statics.getMembersByDepartment = function(department) {
    return this.find({ 
        department: department,
        isActive: true 
    }).sort({ joinDate: -1 });
};

// Static method to get core team members
memberSchema.statics.getCoreTeam = function() {
    return this.find({ 
        membershipType: 'Core Team',
        status: 'Active',
        isActive: true 
    }).sort({ joinDate: 1 });
};

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default Member;
