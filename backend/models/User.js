import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    // Basic Information
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    
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
    profilePicture: {
        type: String,
        default: ''
    },
    
    // Role and Permissions
    role: {
        type: String,
        enum: [
            'super_admin',    // Full system access
            'admin',          // Admin panel access
            'moderator',      // Content moderation
            'member',         // Regular member
            'intern',         // Intern access
            'guest'           // Limited access
        ],
        default: 'guest'
    },
    
    // Granular Permissions
    permissions: {
        // Admin Permissions
        canAccessAdminPanel: { type: Boolean, default: false },
        canManageUsers: { type: Boolean, default: false },
        canManageRoles: { type: Boolean, default: false },
        canViewAnalytics: { type: Boolean, default: false },
        canManageSettings: { type: Boolean, default: false },
        
        // Content Permissions
        canCreateContent: { type: Boolean, default: false },
        canEditContent: { type: Boolean, default: false },
        canDeleteContent: { type: Boolean, default: false },
        canPublishContent: { type: Boolean, default: false },
        canModerateContent: { type: Boolean, default: false },
        
        // Member Management
        canViewMembers: { type: Boolean, default: false },
        canEditMembers: { type: Boolean, default: false },
        canDeleteMembers: { type: Boolean, default: false },
        canInviteMembers: { type: Boolean, default: false },
        
        // Service Management
        canManageServices: { type: Boolean, default: false },
        canViewServices: { type: Boolean, default: true },
        
        // Project Management
        canCreateProjects: { type: Boolean, default: false },
        canManageProjects: { type: Boolean, default: false },
        canViewProjects: { type: Boolean, default: false },
        
        // Event Management
        canCreateEvents: { type: Boolean, default: false },
        canManageEvents: { type: Boolean, default: false },
        canViewEvents: { type: Boolean, default: true },
        
        // Newsletter Management
        canManageNewsletter: { type: Boolean, default: false },
        canViewSubscribers: { type: Boolean, default: false },
        
        // Intern Management
        canManageInterns: { type: Boolean, default: false },
        canViewInternProgress: { type: Boolean, default: false },
        canAssignTasks: { type: Boolean, default: false }
    },
    
    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    // Login Information
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    
    // Additional Information
    department: {
        type: String,
        enum: ['Development', 'Design', 'Marketing', 'Operations', 'HR', 'Finance', 'Content', 'Community'],
        default: 'Development'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    
    // References to other models
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern'
    }
}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for account locked
userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user has specific permission
userSchema.methods.hasPermission = function(permission) {
    if (this.role === 'super_admin') return true; // Super admin has all permissions
    return this.permissions[permission] || false;
};

// Method to check if user has any of the given permissions
userSchema.methods.hasAnyPermission = function(permissionArray) {
    if (this.role === 'super_admin') return true;
    return permissionArray.some(permission => this.permissions[permission]);
};

// Method to check if user has all given permissions
userSchema.methods.hasAllPermissions = function(permissionArray) {
    if (this.role === 'super_admin') return true;
    return permissionArray.every(permission => this.permissions[permission]);
};

// Method to assign role with default permissions
userSchema.methods.assignRole = function(newRole) {
    this.role = newRole;
    
    // Set default permissions based on role
    switch (newRole) {
        case 'super_admin':
            // Super admin gets all permissions
            Object.keys(this.permissions).forEach(key => {
                this.permissions[key] = true;
            });
            break;
            
        case 'admin':
            this.permissions = {
                ...this.permissions,
                canAccessAdminPanel: true,
                canViewAnalytics: true,
                canManageUsers: true,
                canViewMembers: true,
                canEditMembers: true,
                canInviteMembers: true,
                canManageServices: true,
                canViewServices: true,
                canCreateContent: true,
                canEditContent: true,
                canPublishContent: true,
                canManageProjects: true,
                canViewProjects: true,
                canCreateProjects: true,
                canManageEvents: true,
                canViewEvents: true,
                canCreateEvents: true,
                canManageNewsletter: true,
                canViewSubscribers: true,
                canManageInterns: true,
                canViewInternProgress: true,
                canAssignTasks: true
            };
            break;
            
        case 'moderator':
            this.permissions = {
                ...this.permissions,
                canAccessAdminPanel: true,
                canViewMembers: true,
                canEditMembers: true,
                canCreateContent: true,
                canEditContent: true,
                canModerateContent: true,
                canViewServices: true,
                canViewProjects: true,
                canViewEvents: true,
                canViewInternProgress: true
            };
            break;
            
        case 'member':
            this.permissions = {
                ...this.permissions,
                canViewMembers: true,
                canCreateContent: true,
                canViewServices: true,
                canViewProjects: true,
                canViewEvents: true
            };
            break;
            
        case 'intern':
            this.permissions = {
                ...this.permissions,
                canViewMembers: true,
                canViewServices: true,
                canViewProjects: true,
                canViewEvents: true
            };
            break;
            
        case 'guest':
        default:
            // Guest gets minimal permissions
            this.permissions = {
                ...this.permissions,
                canViewServices: true,
                canViewEvents: true
            };
            break;
    }
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = function() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    
    // Lock account after 5 failed attempts for 2 hours
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }
    
    return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

// Static method to create default super admin
userSchema.statics.createSuperAdmin = async function(userData) {
    const superAdmin = new this({
        ...userData,
        role: 'super_admin',
        isEmailVerified: true,
        isActive: true
    });
    
    superAdmin.assignRole('super_admin');
    return superAdmin.save();
};

// Static method to get users by role
userSchema.statics.getUsersByRole = function(role) {
    return this.find({ role, isActive: true }).sort({ createdAt: -1 });
};

// Static method to get active users
userSchema.statics.getActiveUsers = function() {
    return this.find({ isActive: true }).sort({ lastLogin: -1 });
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
