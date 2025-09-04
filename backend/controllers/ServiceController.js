import Service from '../models/Service.js';
import connectDB from '../config/database.js';

// Helper function to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim('-'); // Remove leading/trailing hyphens
};

export class ServiceController {
    
    // Get all services
    static async getAllServices(req, res) {
        try {
            await connectDB();
            
            const { 
                category, 
                status, 
                isVisible, 
                page = 1, 
                limit = 10,
                sortBy = 'displayOrder',
                sortOrder = 'asc'
            } = req.query;
            
            // Build filter object
            const filter = {};
            if (category) filter.category = category;
            if (status) filter.status = status;
            if (isVisible !== undefined) filter.isVisible = isVisible === 'true';
            
            // Build sort object
            const sort = {};
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
            
            // Calculate pagination
            const skip = (page - 1) * limit;
            
            const services = await Service.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit));
                
            const total = await Service.countDocuments(filter);
            
            return res.status(200).json({
                success: true,
                data: services,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            });
            
        } catch (error) {
            console.error('Error fetching services:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching services',
                error: error.message
            });
        }
    }
    
    // Get service by ID
    static async getServiceById(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const service = await Service.findById(id);
            
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                data: service
            });
            
        } catch (error) {
            console.error('Error fetching service:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching service',
                error: error.message
            });
        }
    }
    
    // Get service by slug
    static async getServiceBySlug(req, res) {
        try {
            await connectDB();
            
            const { slug } = req.params;
            const service = await Service.findOne({ slug, isVisible: true });
            
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                data: service
            });
            
        } catch (error) {
            console.error('Error fetching service:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching service',
                error: error.message
            });
        }
    }
    
    // Create new service
    static async createService(req, res) {
        try {
            await connectDB();
            
            const serviceData = req.body;
            
            // Generate slug if not provided
            if (!serviceData.slug) {
                serviceData.slug = generateSlug(serviceData.title);
            }
            
            // Check if slug already exists
            const existingService = await Service.findOne({ slug: serviceData.slug });
            if (existingService) {
                serviceData.slug = `${serviceData.slug}-${Date.now()}`;
            }
            
            // Set display order if not provided
            if (!serviceData.displayOrder) {
                const lastService = await Service.findOne().sort({ displayOrder: -1 });
                serviceData.displayOrder = lastService ? lastService.displayOrder + 1 : 1;
            }
            
            const service = new Service(serviceData);
            await service.save();
            
            return res.status(201).json({
                success: true,
                message: 'Service created successfully',
                data: service
            });
            
        } catch (error) {
            console.error('Error creating service:', error);
            
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Service with this slug already exists',
                    error: error.message
                });
            }
            
            return res.status(500).json({
                success: false,
                message: 'Error creating service',
                error: error.message
            });
        }
    }
    
    // Update service
    static async updateService(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const updateData = req.body;
            
            // If title is being updated, regenerate slug
            if (updateData.title) {
                const newSlug = generateSlug(updateData.title);
                
                // Check if new slug conflicts with existing services (excluding current one)
                const existingService = await Service.findOne({ 
                    slug: newSlug, 
                    _id: { $ne: id } 
                });
                
                if (existingService) {
                    updateData.slug = `${newSlug}-${Date.now()}`;
                } else {
                    updateData.slug = newSlug;
                }
            }
            
            const service = await Service.findByIdAndUpdate(
                id, 
                updateData, 
                { 
                    new: true, 
                    runValidators: true 
                }
            );
            
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                data: service
            });
            
        } catch (error) {
            console.error('Error updating service:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating service',
                error: error.message
            });
        }
    }
    
    // Delete service
    static async deleteService(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const service = await Service.findByIdAndDelete(id);
            
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Service deleted successfully',
                data: service
            });
            
        } catch (error) {
            console.error('Error deleting service:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting service',
                error: error.message
            });
        }
    }
    
    // Toggle service status
    static async toggleServiceStatus(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const service = await Service.findById(id);
            
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            
            await service.toggleStatus();
            
            return res.status(200).json({
                success: true,
                message: 'Service status updated successfully',
                data: service
            });
            
        } catch (error) {
            console.error('Error toggling service status:', error);
            return res.status(500).json({
                success: false,
                message: 'Error toggling service status',
                error: error.message
            });
        }
    }
    
    // Get active services (public endpoint)
    static async getActiveServices(req, res) {
        try {
            await connectDB();
            
            const services = await Service.getActiveServices();
            
            return res.status(200).json({
                success: true,
                data: services
            });
            
        } catch (error) {
            console.error('Error fetching active services:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching active services',
                error: error.message
            });
        }
    }
    
    // Get services by category (public endpoint)
    static async getServicesByCategory(req, res) {
        try {
            await connectDB();
            
            const { category } = req.params;
            const services = await Service.getByCategory(category);
            
            return res.status(200).json({
                success: true,
                data: services
            });
            
        } catch (error) {
            console.error('Error fetching services by category:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching services by category',
                error: error.message
            });
        }
    }
    
    // Bulk operations
    static async bulkUpdateServices(req, res) {
        try {
            await connectDB();
            
            const { ids, updateData } = req.body;
            
            const result = await Service.updateMany(
                { _id: { $in: ids } },
                updateData
            );
            
            return res.status(200).json({
                success: true,
                message: `${result.modifiedCount} services updated successfully`,
                data: result
            });
            
        } catch (error) {
            console.error('Error bulk updating services:', error);
            return res.status(500).json({
                success: false,
                message: 'Error bulk updating services',
                error: error.message
            });
        }
    }
}
