import { ServiceController } from '../../../../../../backend/controllers/ServiceController.js';
import { withAuth } from '../../../../../../backend/middleware/auth.js';

async function toggleServiceStatus(request, { params }) {
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
        
        await ServiceController.toggleServiceStatus(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export const PATCH = withAuth(toggleServiceStatus);
