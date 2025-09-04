import Intern from '../models/Intern.js';
import connectDB from '../config/database.js';

export class InternController {
    
    // Get all interns
    static async getAllInterns(req, res) {
        try {
            await connectDB();
            
            const { 
                status, 
                internshipType, 
                page = 1, 
                limit = 10,
                sortBy = 'startDate',
                sortOrder = 'desc',
                search
            } = req.query;
            
            // Build filter object
            const filter = { isActive: true };
            if (status) filter.status = status;
            if (internshipType) filter.internshipType = internshipType;
            
            // Add search functionality
            if (search) {
                filter.$or = [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { skills: { $in: [new RegExp(search, 'i')] } }
                ];
            }
            
            // Build sort object
            const sort = {};
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
            
            // Calculate pagination
            const skip = (page - 1) * limit;
            
            const interns = await Intern.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit));
                
            const total = await Intern.countDocuments(filter);
            
            // Update progress for active interns
            const internsWithProgress = interns.map(intern => {
                if (intern.status === 'Active') {
                    intern.progress = intern.calculateProgress();
                }
                return intern;
            });
            
            return res.status(200).json({
                success: true,
                data: internsWithProgress,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            });
            
        } catch (error) {
            console.error('Error fetching interns:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching interns',
                error: error.message
            });
        }
    }
    
    // Get intern by ID
    static async getInternById(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const intern = await Intern.findById(id);
            
            if (!intern || !intern.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Intern not found'
                });
            }
            
            // Update progress
            if (intern.status === 'Active') {
                intern.progress = intern.calculateProgress();
            }
            
            return res.status(200).json({
                success: true,
                data: intern
            });
            
        } catch (error) {
            console.error('Error fetching intern:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching intern',
                error: error.message
            });
        }
    }
    
    // Create new intern
    static async createIntern(req, res) {
        try {
            await connectDB();
            
            const internData = req.body;
            
            // Check if email already exists
            const existingIntern = await Intern.findOne({ 
                email: internData.email,
                isActive: true 
            });
            
            if (existingIntern) {
                return res.status(400).json({
                    success: false,
                    message: 'An intern with this email already exists'
                });
            }
            
            // Calculate duration if not provided
            if (!internData.duration && internData.startDate && internData.endDate) {
                const start = new Date(internData.startDate);
                const end = new Date(internData.endDate);
                const diffTime = Math.abs(end - start);
                const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
                internData.duration = `${diffMonths} months`;
            }
            
            const intern = new Intern(internData);
            await intern.save();
            
            return res.status(201).json({
                success: true,
                message: 'Intern created successfully',
                data: intern
            });
            
        } catch (error) {
            console.error('Error creating intern:', error);
            
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'An intern with this email already exists'
                });
            }
            
            return res.status(500).json({
                success: false,
                message: 'Error creating intern',
                error: error.message
            });
        }
    }
    
    // Update intern
    static async updateIntern(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const updateData = req.body;
            
            // Remove id from update data if present
            delete updateData._id;
            
            const intern = await Intern.findByIdAndUpdate(
                id, 
                updateData, 
                { 
                    new: true, 
                    runValidators: true 
                }
            );
            
            if (!intern || !intern.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Intern not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Intern updated successfully',
                data: intern
            });
            
        } catch (error) {
            console.error('Error updating intern:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating intern',
                error: error.message
            });
        }
    }
    
    // Delete intern (soft delete)
    static async deleteIntern(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const intern = await Intern.findByIdAndUpdate(
                id,
                { isActive: false },
                { new: true }
            );
            
            if (!intern) {
                return res.status(404).json({
                    success: false,
                    message: 'Intern not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Intern deleted successfully'
            });
            
        } catch (error) {
            console.error('Error deleting intern:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting intern',
                error: error.message
            });
        }
    }
    
    // Update intern status
    static async updateInternStatus(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { status } = req.body;
            
            const intern = await Intern.findByIdAndUpdate(
                id,
                { status, lastActive: new Date() },
                { new: true }
            );
            
            if (!intern || !intern.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Intern not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Intern status updated successfully',
                data: intern
            });
            
        } catch (error) {
            console.error('Error updating intern status:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating intern status',
                error: error.message
            });
        }
    }
    
    // Get active interns
    static async getActiveInterns(req, res) {
        try {
            await connectDB();
            
            const interns = await Intern.getActiveInterns();
            
            return res.status(200).json({
                success: true,
                data: interns
            });
            
        } catch (error) {
            console.error('Error fetching active interns:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching active interns',
                error: error.message
            });
        }
    }
    
    // Get interns by type
    static async getInternsByType(req, res) {
        try {
            await connectDB();
            
            const { type } = req.params;
            const interns = await Intern.getInternsByType(type);
            
            return res.status(200).json({
                success: true,
                data: interns
            });
            
        } catch (error) {
            console.error('Error fetching interns by type:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching interns by type',
                error: error.message
            });
        }
    }
    
    // Add feedback to intern
    static async addFeedback(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { mentor, comment, rating } = req.body;
            
            const intern = await Intern.findById(id);
            
            if (!intern || !intern.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Intern not found'
                });
            }
            
            intern.performance.feedback.push({
                date: new Date(),
                mentor,
                comment,
                rating
            });
            
            // Update overall rating (average of all feedback)
            const allRatings = intern.performance.feedback.map(f => f.rating);
            intern.performance.rating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
            
            await intern.save();
            
            return res.status(200).json({
                success: true,
                message: 'Feedback added successfully',
                data: intern
            });
            
        } catch (error) {
            console.error('Error adding feedback:', error);
            return res.status(500).json({
                success: false,
                message: 'Error adding feedback',
                error: error.message
            });
        }
    }
}
