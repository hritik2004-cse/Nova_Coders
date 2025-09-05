import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // In a real application, you would:
        // 1. Verify the token
        // 2. Add it to a blacklist
        // 3. Clear server-side sessions if using them
        
        // Create response
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });

        // Clear the auth cookie
        response.cookies.set('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0, // Immediately expire
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error' 
            },
            { status: 500 }
        );
    }
}
