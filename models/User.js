import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true,
    enum: ['student', 'developer', 'designer', 'manager', 'freelancer', 'entrepreneur', 'other']
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'moderator', 'super_admin']
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  // Student-specific fields
  course: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  collegeName: {
    type: String,
    trim: true
  },
  yearOfStudy: {
    type: String
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Create index for better performance (only for non-unique fields)
UserSchema.index({ createdAt: -1 });

// Pre-save middleware to update the updatedAt field
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Prevent re-compilation in development
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
