import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
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
    
    // Internship Details
    internshipType: {
        type: String,
        enum: ['Full-Stack Development', 'Frontend Development', 'Backend Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'DevOps', 'Other'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: String, // e.g., "3 months", "6 months"
        required: true
    },
    
    // Skills and Experience
    skills: [{
        type: String,
        trim: true
    }],
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    education: {
        degree: String,
        institution: String,
        graduationYear: Number
    },
    
    // Status and Progress
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Terminated', 'On Hold'],
        default: 'Active'
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    
    // Mentor and Project Assignment
    assignedMentor: {
        type: String,
        default: ''
    },
    currentProject: {
        name: String,
        description: String,
        startDate: Date,
        expectedEndDate: Date
    },
    
    // Performance Tracking
    performance: {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 3
        },
        feedback: [{
            date: Date,
            mentor: String,
            comment: String,
            rating: Number
        }]
    },
    
    // Contact and Emergency
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String
    },
    
    // Administrative
    isActive: {
        type: Boolean,
        default: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    },
    
    // Certificates and Achievements
    certificates: [{
        name: String,
        issuedDate: Date,
        certificateUrl: String
    }],
    achievements: [{
        title: String,
        description: String,
        dateAchieved: Date
    }]
}, {
    timestamps: true
});

// Indexes for better performance
internSchema.index({ email: 1 });
internSchema.index({ status: 1 });
internSchema.index({ internshipType: 1 });
internSchema.index({ startDate: 1, endDate: 1 });

// Virtual for full name
internSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Method to calculate internship progress based on dates
internSchema.methods.calculateProgress = function() {
    const now = new Date();
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const totalDuration = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / totalDuration) * 100);
};

// Static method to get active interns
internSchema.statics.getActiveInterns = function() {
    return this.find({ 
        status: 'Active', 
        isActive: true 
    }).sort({ startDate: -1 });
};

// Static method to get interns by type
internSchema.statics.getInternsByType = function(type) {
    return this.find({ 
        internshipType: type,
        isActive: true 
    }).sort({ startDate: -1 });
};

const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema);

export default Intern;
