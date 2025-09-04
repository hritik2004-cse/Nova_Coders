export async function POST(request) {
    try {
        // Clear the authentication cookie
        const response = Response.json({
            success: true,
            message: 'Logout successful'
        });
        
        // Clear cookie
        response.headers.set('Set-Cookie', 'adminToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
        
        return response;
        
    } catch (error) {
        return Response.json({
            success: false,
            message: 'Logout failed'
        }, { status: 500 });
    }
}
