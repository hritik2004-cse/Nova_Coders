import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            profession,
            course,
            branch,
            collegeName,
            phoneNumber,
            city,
            yearOfStudy
        } = await request.json();

        // Validate required fields
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !profession) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'All required fields must be filled' 
                },
                { status: 400 }
            );
        }

        // Validate password match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Passwords do not match' 
                },
                { status: 400 }
            );
        }

        // Simplified password validation for speed
        if (password.length < 6) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Password must be at least 6 characters' 
                },
                { status: 400 }
            );
        }

        // Check if username already exists in database
        const existingUsername = await User.findOne({ username: username.toLowerCase() });
        if (existingUsername) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Username is already taken' 
                },
                { status: 409 }
            );
        }

        // Check if email already exists in database
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Email is already registered' 
                },
                { status: 409 }
            );
        }

        // Validate student-specific fields
        if (profession === 'student') {
            if (!course || !branch || !collegeName || !yearOfStudy) {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: 'All student information fields are required' 
                    },
                    { status: 400 }
                );
            }
        }

        // Lightning-fast password hashing (minimal security for demo speed)
        const saltRounds = 4; // Reduced from 8 for maximum speed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user in MongoDB
        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            profession,
            role: 'user', // Default role
            isEmailVerified: false,
            phoneNumber: phoneNumber?.trim() || null,
            city: city?.trim() || null,
            ...(profession === 'student' && {
                course: course.trim(),
                branch: branch.trim(),
                collegeName: collegeName.trim(),
                yearOfStudy
            })
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Generate JWT token for auto-login
        const token = jwt.sign(
            { 
                userId: savedUser._id, 
                username: savedUser.username, 
                email: savedUser.email,
                role: savedUser.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        // Return success response (exclude password)
        const userResponse = {
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            username: savedUser.username,
            email: savedUser.email,
            profession: savedUser.profession,
            role: savedUser.role,
            isEmailVerified: savedUser.isEmailVerified,
            phoneNumber: savedUser.phoneNumber,
            city: savedUser.city,
            ...(savedUser.profession === 'student' && {
                course: savedUser.course,
                branch: savedUser.branch,
                collegeName: savedUser.collegeName,
                yearOfStudy: savedUser.yearOfStudy
            }),
            createdAt: savedUser.createdAt
        };

        // Create response with secure cookie
        const response = NextResponse.json({
            success: true,
            message: 'Account created successfully! Welcome to Nova Coders!',
            user: userResponse,
            token
        }, { status: 201 });

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
        console.error('Signup error:', error);
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return NextResponse.json(
                { 
                    success: false, 
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is already taken` 
                },
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error' 
            },
            { status: 500 }
        );
    }
}

// Get all users (for development/testing purposes)
export async function GET() {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Fetch all users from database (excluding passwords)
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        
        return NextResponse.json({
            success: true,
            users: users,
            count: users.length
        });
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error' 
            },
            { status: 500 }
        );
    }
}
