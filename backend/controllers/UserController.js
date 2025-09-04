import User from '../models/User.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            role = '',
            department = '',
            isActive = ''
        } = req.query;
        
        // Build filter object
        const filter = {};
        
        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (role) filter.role = role;
        if (department) filter.department = department;
        if (isActive !== '') filter.isActive = isActive === 'true';
        
        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get users with pagination
        const users = await User.find(filter)
            .select('-password -passwordResetToken -emailVerificationToken')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('memberId', 'membershipType')
            .populate('internId', 'position');
        
        // Get total count for pagination
        const total = await User.countDocuments(filter);
        
        res.json({
            success: true,
            users,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / parseInt(limit)),
                total,
                limit: parseInt(limit)
            }
        });
        
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id)
            .select('-password -passwordResetToken -emailVerificationToken')
            .populate('memberId')
            .populate('internId');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error.message
        });
    }
};

// Create new user (admin only)
export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            role = 'guest',
            department,
            permissions = {}
        } = req.body;
        
        // Validate required fields
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email 
                    ? 'Email already registered' 
                    : 'Username already taken'
            });
        }
        
        // Create new user
        const user = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            department,
            isEmailVerified: true // Admin-created accounts are pre-verified
        });
        
        // Assign role and default permissions
        user.assignRole(role);
        
        // Override with custom permissions if provided
        if (Object.keys(permissions).length > 0) {
            Object.assign(user.permissions, permissions);
        }
        
        await user.save();
        
        // Return user info (without password)
        const userResponse = await User.findById(user._id)
            .select('-password -passwordResetToken -emailVerificationToken');
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: userResponse
        });
        
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};

// Update user (admin only or user updating own profile)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // Check if user is updating their own profile or is admin
        const isOwnProfile = req.user._id.toString() === id;
        const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';
        
        if (!isOwnProfile && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only update your own profile.'
            });
        }
        
        // If user is updating own profile, restrict certain fields
        if (isOwnProfile && !isAdmin) {
            delete updates.role;
            delete updates.permissions;
            delete updates.isActive;
            delete updates.loginAttempts;
            delete updates.lockUntil;
        }
        
        // Don't allow password updates through this endpoint
        delete updates.password;
        
        const user = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-password -passwordResetToken -emailVerificationToken');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: 'User updated successfully',
            user
        });
        
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
};

// Update user role and permissions (admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, permissions } = req.body;
        
        if (!role) {
            return res.status(400).json({
                success: false,
                message: 'Role is required'
            });
        }
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Prevent non-super-admins from creating/modifying super admins
        if (req.user.role !== 'super_admin') {
            if (role === 'super_admin' || user.role === 'super_admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Only super admins can manage super admin accounts'
                });
            }
        }
        
        // Assign new role with default permissions
        user.assignRole(role);
        
        // Override with custom permissions if provided
        if (permissions && Object.keys(permissions).length > 0) {
            Object.assign(user.permissions, permissions);
        }
        
        await user.save();
        
        const updatedUser = await User.findById(id)
            .select('-password -passwordResetToken -emailVerificationToken');
        
        res.json({
            success: true,
            message: 'User role and permissions updated successfully',
            user: updatedUser
        });
        
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user role',
            error: error.message
        });
    }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Prevent deletion of super admin by non-super admin
        if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admins can delete super admin accounts'
            });
        }
        
        // Prevent users from deleting themselves
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }
        
        await User.findByIdAndDelete(id);
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
        
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};

// Activate/Deactivate user (admin only)
export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Prevent status change of super admin by non-super admin
        if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admins can change super admin status'
            });
        }
        
        // Prevent users from deactivating themselves
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change your own account status'
            });
        }
        
        user.isActive = !user.isActive;
        await user.save();
        
        const updatedUser = await User.findById(id)
            .select('-password -passwordResetToken -emailVerificationToken');
        
        res.json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            user: updatedUser
        });
        
    } catch (error) {
        console.error('Toggle user status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user status',
            error: error.message
        });
    }
};

// Get user statistics (admin only)
export const getUserStats = async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalUsers: { $sum: 1 },
                    activeUsers: {
                        $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                    },
                    verifiedUsers: {
                        $sum: { $cond: [{ $eq: ['$isEmailVerified', true] }, 1, 0] }
                    }
                }
            }
        ]);
        
        const roleStats = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const departmentStats = await User.aggregate([
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const recentUsers = await User.find()
            .select('-password -passwordResetToken -emailVerificationToken')
            .sort({ createdAt: -1 })
            .limit(5);
        
        res.json({
            success: true,
            stats: stats[0] || { totalUsers: 0, activeUsers: 0, verifiedUsers: 0 },
            roleStats,
            departmentStats,
            recentUsers
        });
        
    } catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user statistics',
            error: error.message
        });
    }
};

// Unlock user account (admin only)
export const unlockUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        await user.resetLoginAttempts();
        
        res.json({
            success: true,
            message: 'User account unlocked successfully'
        });
        
    } catch (error) {
        console.error('Unlock user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unlock user account',
            error: error.message
        });
    }
};

const userController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserRole,
    deleteUser,
    toggleUserStatus,
    getUserStats,
    unlockUser
};

export default userController;
