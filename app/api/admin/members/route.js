import { MemberController } from '../../../../backend/controllers/MemberController.js';
import { withAuth } from '../../../../backend/middleware/auth.js';

async function getAllMembers(request) {
    try {
        const url = new URL(request.url);
        const params = {};
        
        // Extract query parameters
        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        
        const mockReq = { query: params };
        
        let responseData = null;
        let responseStatus = 200;
        
        const mockRes = {
            status: (code) => ({
                json: (data) => {
                    responseStatus = code;
                    responseData = data;
                    return { status: code, json: data };
                }
            })
        };
        
        await MemberController.getAllMembers(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function createMember(request) {
    try {
        const body = await request.json();
        
        const mockReq = { body };
        
        let responseData = null;
        let responseStatus = 200;
        
        const mockRes = {
            status: (code) => ({
                json: (data) => {
                    responseStatus = code;
                    responseData = data;
                    return { status: code, json: data };
                }
            })
        };
        
        await MemberController.createMember(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export const GET = withAuth(getAllMembers);
export const POST = withAuth(createMember);
