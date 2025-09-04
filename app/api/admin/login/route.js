import { adminLogin } from '../../../../backend/middleware/auth.js';

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;
        
        if (!username || !password) {
            return Response.json({
                success: false,
                message: 'Username and password are required'
            }, { status: 400 });
        }
        
        // Attempt login
        const result = await adminLogin(username, password);
        
        if (!result.success) {
            return Response.json({
                success: false,
                message: result.message
            }, { status: 401 });
        }
        
        // Set HTTP-only cookie for security
        const response = Response.json({
            success: true,
            message: 'Login successful',
            user: result.user
        });
        
        // Set cookie with token
        response.headers.set('Set-Cookie', `adminToken=${result.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);
        
        return response;
        
    } catch (error) {
        console.error('Login error:', error);
        return Response.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
