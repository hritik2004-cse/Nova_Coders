import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const { identifier, password } = await request.json();

        // Validate required fields
        if (!identifier || !password) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Username/email and password are required' 
                },
                { status: 400 }
            );
        }

        // Find user by username or email in database
        const user = await User.findOne({
            $or: [
                { username: identifier.toLowerCase() },
                { email: identifier.toLowerCase() }
            ]
        });

        if (!user) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Invalid credentials' 
                },
                { status: 401 }
            );
        }

        // Check password
        let isPasswordValid = false;
        
        // Check hashed password
        try {
            isPasswordValid = await bcrypt.compare(password, user.password);
        } catch (error) {
            console.error('Password comparison error:', error);
            isPasswordValid = false;
        }

        if (!isPasswordValid) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Invalid credentials' 
                },
                { status: 401 }
            );
        }

        // Generate JWT token with longer expiry for better persistence
        const token = jwt.sign(
            { 
                userId: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' } // 7 days instead of 24h
        );

        // Return success response (exclude password)
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
            createdAt: user.createdAt
        };

        // Create response with secure cookie
        const response = NextResponse.json({
            success: true,
            message: 'Login successful! Welcome back!',
            user: userResponse,
            token
        });

        // Set secure HTTP-only cookie for persistence
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error' 
            },
            { status: 500 }
        );
    }
}
