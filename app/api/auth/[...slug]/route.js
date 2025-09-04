import { NextResponse } from 'next/server';
import AuthController from '../../../../backend/controllers/AuthController.js';
import { authenticateToken } from '../../../../backend/middleware/rbac.js';

// Helper function to create mock req/res for middleware compatibility
function createMockReqRes(request, body = null, params = {}) {
    const url = new URL(request.url);
    
    const req = {
        headers: {
            authorization: request.headers.get('authorization'),
            'content-type': request.headers.get('content-type')
        },
        cookies: request.cookies,
        query: Object.fromEntries(url.searchParams),
        params,
        body,
        user: null
    };
    
    const res = {
        status: (code) => ({
            json: (data) => NextResponse.json(data, { status: code })
        }),
        json: (data) => NextResponse.json(data),
        cookie: (name, value, options) => {
            // Handle cookie setting
            const response = NextResponse.json({ success: true });
            response.cookies.set(name, value, options);
            return response;
        },
        clearCookie: (name, options) => {
            const response = NextResponse.json({ success: true });
            response.cookies.delete(name);
            return response;
        }
    };
    
    return { req, res };
}

export async function POST(request, { params }) {
    try {
        const { slug } = params;
        const endpoint = slug[0];
        const body = await request.json();
        
        const { req, res } = createMockReqRes(request, body);
        
        switch (endpoint) {
            case 'register':
                return await AuthController.register(req, res);
                
            case 'login':
                return await AuthController.login(req, res);
                
            case 'logout':
                return await AuthController.logout(req, res);
                
            case 'forgot-password':
                return await AuthController.requestPasswordReset(req, res);
                
            case 'reset-password':
                return await AuthController.resetPassword(req, res);
                
            case 'change-password':
                // Apply authentication first
                await new Promise((resolve, reject) => {
                    authenticateToken(req, res, (error) => {
                        if (error) reject(error);
                        else resolve();
                    });
                });
                return await AuthController.changePassword(req, res);
                
            default:
                return NextResponse.json({
                    success: false,
                    message: 'Endpoint not found'
                }, { status: 404 });
        }
        
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { slug } = params;
        const endpoint = slug[0];
        
        const { req, res } = createMockReqRes(request);
        
        switch (endpoint) {
            case 'profile':
                // Apply authentication first
                await new Promise((resolve, reject) => {
                    authenticateToken(req, res, (error) => {
                        if (error) reject(error);
                        else resolve();
                    });
                });
                return await AuthController.getProfile(req, res);
                
            case 'verify-email':
                const token = slug[1]; // token from URL
                req.params = { token };
                return await AuthController.verifyEmail(req, res);
                
            default:
                return NextResponse.json({
                    success: false,
                    message: 'Endpoint not found'
                }, { status: 404 });
        }
        
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { slug } = params;
        const endpoint = slug[0];
        const body = await request.json();
        
        const { req, res } = createMockReqRes(request, body);
        
        if (endpoint === 'profile') {
            // Apply authentication first
            await new Promise((resolve, reject) => {
                authenticateToken(req, res, (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });
            return await AuthController.updateProfile(req, res);
        }
        
        return NextResponse.json({
            success: false,
            message: 'Endpoint not found'
        }, { status: 404 });
        
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        }, { status: 500 });
    }
}
