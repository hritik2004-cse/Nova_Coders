import { NextResponse } from 'next/server';

// This will be replaced with actual database query later
const existingUsernames = [
    'admin',
    'novacoders',
    'root',
    'administrator',
    'user',
    'test',
    'demo',
    'guest',
    'support',
    'help',
    'info',
    'contact',
    'mail',
    'email',
    'webmaster',
    'postmaster',
    'hostmaster',
    'usenet',
    'news',
    'www',
    'web',
    'ftp',
    'api',
    'blog',
    'forum',
    'shop',
    'store',
    'service',
    'services',
    'team',
    'staff',
    'member',
    'members',
    'developer',
    'developers'
];

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Username parameter is required' 
                },
                { status: 400 }
            );
        }

        // Validate username format
        if (username.length < 3) {
            return NextResponse.json({
                success: true,
                available: false,
                message: 'Username must be at least 3 characters long'
            });
        }

        if (username.length > 20) {
            return NextResponse.json({
                success: true,
                available: false,
                message: 'Username must be less than 20 characters'
            });
        }

        // Check if username contains only allowed characters
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json({
                success: true,
                available: false,
                message: 'Username can only contain letters, numbers, and underscores'
            });
        }

        // Check if username is reserved or already taken
        const isReserved = existingUsernames.includes(username.toLowerCase());
        
        if (isReserved) {
            return NextResponse.json({
                success: true,
                available: false,
                message: 'Username is already taken or reserved'
            });
        }

        // In a real application, you would check against your database here
        // For now, we'll simulate some taken usernames
        const simulatedTakenUsernames = [
            'john123',
            'sarah456',
            'mike789',
            'emma2024',
            'alex_dev',
            'coding_master',
            'web_ninja',
            'react_guru'
        ];

        const isTaken = simulatedTakenUsernames.includes(username.toLowerCase());

        if (isTaken) {
            return NextResponse.json({
                success: true,
                available: false,
                message: 'Username is already taken'
            });
        }

        // Username is available
        return NextResponse.json({
            success: true,
            available: true,
            message: 'Username is available'
        });

    } catch (error) {
        console.error('Username check error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error' 
            },
            { status: 500 }
        );
    }
}
