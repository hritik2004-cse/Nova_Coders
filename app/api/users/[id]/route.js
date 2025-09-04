import UserController from '../../../../backend/controllers/UserController.js';
import { 
    authenticateToken, 
    requireAdmin, 
    requireOwnershipOrPermission 
} from '../../../../backend/middleware/rbac.js';

// GET /api/users/[id] - Get user by ID
export async function GET(request, { params }) {
    try {
        const req = {
            headers: { authorization: request.headers.get('authorization') },
            cookies: Object.fromEntries(request.headers.get('cookie')?.split('; ').map(c => c.split('=')) || []),
            params: { id: params.id }
        };
        
        const res = {
            status: (code) => ({ json: (data) => new Response(JSON.stringify(data), { status: code }) }),
            json: (data) => new Response(JSON.stringify(data), { status: 200 })
        };
        
        // Apply authentication middleware
        await new Promise((resolve, reject) => {
            authenticateToken(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        // Check if user can view this profile (admin or own profile)
        await new Promise((resolve, reject) => {
            requireOwnershipOrPermission('canViewMembers')(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        return await UserController.getUserById(req, res);
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), { status: 500 });
    }
}

// PUT /api/users/[id] - Update user
export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        
        const req = {
            headers: { authorization: request.headers.get('authorization') },
            cookies: Object.fromEntries(request.headers.get('cookie')?.split('; ').map(c => c.split('=')) || []),
            params: { id: params.id },
            body
        };
        
        const res = {
            status: (code) => ({ json: (data) => new Response(JSON.stringify(data), { status: code }) }),
            json: (data) => new Response(JSON.stringify(data), { status: 200 })
        };
        
        // Apply authentication middleware
        await new Promise((resolve, reject) => {
            authenticateToken(req, res, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
        
        return await UserController.updateUser(req, res);
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), { status: 500 });
    }
}

// DELETE /api/users/[id] - Delete user (admin only)
export async function DELETE(request, { params }) {
    try {
        const req = {
            headers: { authorization: request.headers.get('authorization') },
            cookies: Object.fromEntries(request.headers.get('cookie')?.split('; ').map(c => c.split('=')) || []),
            params: { id: params.id }
        };
        
        const res = {
            status: (code) => ({ json: (data) => new Response(JSON.stringify(data), { status: code }) }),
            json: (data) => new Response(JSON.stringify(data), { status: 200 })
        };
        
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
        
        return await UserController.deleteUser(req, res);
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), { status: 500 });
    }
}
