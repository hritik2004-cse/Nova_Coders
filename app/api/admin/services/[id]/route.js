import { ServiceController } from '../../../../../backend/controllers/ServiceController.js';
import { withAuth } from '../../../../../backend/middleware/auth.js';

async function getServiceById(request, { params }) {
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
        
        await ServiceController.getServiceById(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function updateService(request, { params }) {
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
        
        await ServiceController.updateService(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

async function deleteService(request, { params }) {
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
        
        await ServiceController.deleteService(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export const GET = withAuth(getServiceById);
export const PUT = withAuth(updateService);
export const DELETE = withAuth(deleteService);
