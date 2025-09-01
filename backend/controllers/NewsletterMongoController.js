import connectDB from '../config/database.js';
import Subscriber from '../models/SubscriberMongo.js';

class NewsletterMongoController {
    // Subscribe to newsletter (without sending email)
    async subscribeWithoutEmail(req, res) {
        try {
            await connectDB();
            
            const { email, firstName, source = 'website', metadata = {} } = req.body;

            if (!email || !this.isValidEmail(email)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid email address'
                });
            }

            const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
            
            if (existingSubscriber) {
                if (existingSubscriber.status === 'active') {
                    return res.status(200).json({
                        success: true,
                        message: 'Already subscribed'
                    });
                } else if (existingSubscriber.status === 'unsubscribed') {
                    existingSubscriber.status = 'active';
                    existingSubscriber.unsubscribedAt = null;
                    if (firstName) existingSubscriber.firstName = firstName;
                    await existingSubscriber.save();
                    
                    return res.status(200).json({
                        success: true,
                        message: 'Subscription reactivated'
                    });
                }
            }

            const newSubscriber = new Subscriber({
                email: email.toLowerCase(),
                firstName: firstName || email.split('@')[0],
                source,
                metadata,
                preferences: {
                    topics: ['tech', 'coding']
                }
            });

            await newSubscriber.save();

            res.status(201).json({
                success: true,
                message: 'Successfully subscribed!'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    // Get newsletter statistics
    async getStats(req, res) {
        try {
            await connectDB();
            const stats = await Subscriber.getStats();
            
            res.status(200).json({
                success: true,
                stats
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    // Email validation helper
    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (!emailRegex.test(email)) return false;
        if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) return false;
        if (email.includes(' ')) return false;
        
        const [localPart] = email.split('@');
        if (localPart.length <= 2) return false;
        
        return true;
    }
}

export default NewsletterMongoController;
