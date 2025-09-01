import NewsletterMongoController from '../../../backend/controllers/NewsletterMongoController.js';

const newsletterController = new NewsletterMongoController();

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const action = url.searchParams.get('action');
        
        if (action === 'stats') {
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
            
            await newsletterController.getStats({}, mockRes);
            return Response.json(responseData, { status: responseStatus });
        }
        
        return Response.json({ 
            success: true, 
            message: 'Newsletter API is working!',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        const mockReq = {
            body: {
                ...body,
                skipEmail: true
            }
        };
        
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
        
        await newsletterController.subscribeWithoutEmail(mockReq, mockRes);
        
        return Response.json(responseData, { status: responseStatus });
        
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: 'Internal server error' 
        }, { status: 500 });
    }
}
