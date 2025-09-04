import { NextResponse } from 'next/server';
import UserController from '../../../backend/controllers/UserController.js';
import { 
    authenticateToken, 
    requireAdmin
} from '../../../backend/middleware/rbac.js';

// Helper function to create mock req/res for middleware compatibility
function createMockReqRes(request, body = null, params = {}) {
    const url = new URL(request.url);
    
    const req = {
        headers: {
            authorization: request.headers.get('authorization'),
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
        json: (data) => NextResponse.json(data)
    };
    
    return { req, res };
}

// GET /api/users - Get all users (admin only)
export async function GET(request) {
    try {
        const { req, res } = createMockReqRes(request);
        
        // Apply authentication middleware
        await new Promise((resolve, reject) => {
            authenticateToken(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        // Apply admin authorization
        await new Promise((resolve, reject) => {
            requireAdmin(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        return await UserController.getAllUsers(req, res);
        
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

// POST /api/users - Create new user (admin only)
export async function POST(request) {
    try {
        const body = await request.json();
        const { req, res } = createMockReqRes(request, body);
        
        // Apply authentication middleware
        await new Promise((resolve, reject) => {
            authenticateToken(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        // Apply admin authorization
        await new Promise((resolve, reject) => {
            requireAdmin(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        return await UserController.createUser(req, res);
        
    } catch (error) {
        console.error('Create user error:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
