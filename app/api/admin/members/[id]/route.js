import { MemberController } from '../../../../../backend/controllers/MemberController.js';
import { withAuth } from '../../../../../backend/middleware/auth.js';

async function getMemberById(request, { params }) {
    try {
        const { id } = params;
        const mockReq = { params: { id } };
        
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
        
        await MemberController.getMemberById(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function updateMember(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const mockReq = { params: { id }, body };
        
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
        
        await MemberController.updateMember(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function deleteMember(request, { params }) {
    try {
        const { id } = params;
        const mockReq = { params: { id } };
        
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
        
        await MemberController.deleteMember(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export const GET = withAuth(getMemberById);
export const PUT = withAuth(updateMember);
export const DELETE = withAuth(deleteMember);
