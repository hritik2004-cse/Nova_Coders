import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Helper function to verify JWT token
function verifyToken(request) {
    try {
        // Check Authorization header first
        const authHeader = request.headers.get('authorization');
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        } else {
            // Check for token passed from middleware
            token = request.headers.get('x-auth-token');
            
            // If no token from middleware, check cookies directly
            if (!token) {
                const cookieHeader = request.headers.get('cookie');
                if (cookieHeader) {
                    const cookies = Object.fromEntries(
                        cookieHeader.split('; ').map(c => c.split('='))
                    );
                    token = cookies.authToken;
                }
            }
        }

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// Get user profile
export async function GET(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const decoded = verifyToken(request);
        
        if (!decoded) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        // Find user by ID from token in database
        const user = await User.findById(decoded.userId, { password: 0 }); // Exclude password
        
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Return user data with proper format
        const userResponse = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            profession: user.profession,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            phoneNumber: user.phoneNumber,
            city: user.city,
            ...(user.profession === 'student' && {
                course: user.course,
                branch: user.branch,
                collegeName: user.collegeName,
                yearOfStudy: user.yearOfStudy
            }),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return NextResponse.json({
            success: true,
            user: userResponse
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT: Update user profile
export async function PUT(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const decoded = verifyToken(request);
        
        if (!decoded) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const updates = await request.json();

        // Remove sensitive fields that shouldn't be updated via this route
        delete updates.password;
        delete updates.role;
        delete updates._id;
        delete updates.id;

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            { ...updates, updatedAt: new Date() },
            { new: true, select: '-password' } // Return updated doc without password
        );
        
        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Return updated user with proper format
        const userResponse = {
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            username: updatedUser.username,
            email: updatedUser.email,
            profession: updatedUser.profession,
            role: updatedUser.role,
            isEmailVerified: updatedUser.isEmailVerified,
            phoneNumber: updatedUser.phoneNumber,
            city: updatedUser.city,
            ...(updatedUser.profession === 'student' && {
                course: updatedUser.course,
                branch: updatedUser.branch,
                collegeName: updatedUser.collegeName,
                yearOfStudy: updatedUser.yearOfStudy
            }),
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        };

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}