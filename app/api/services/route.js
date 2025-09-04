import { ServiceController } from '../../../backend/controllers/ServiceController.js';

export async function GET(request) {
    try {
        const mockReq = {};
        
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
        
        await ServiceController.getActiveServices(mockReq, mockRes);
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
