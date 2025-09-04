import { InternController } from '../../../../../backend/controllers/InternController.js';
import { withAuth } from '../../../../../backend/middleware/auth.js';

async function getInternById(request, { params }) {
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
        
        await InternController.getInternById(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function updateIntern(request, { params }) {
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
        
        await InternController.updateIntern(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function deleteIntern(request, { params }) {
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
        
        await InternController.deleteIntern(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export const GET = withAuth(getInternById);
export const PUT = withAuth(updateIntern);
export const DELETE = withAuth(deleteIntern);
