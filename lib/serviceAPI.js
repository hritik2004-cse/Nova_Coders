// Frontend utility to fetch services from API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ServiceAPI {
    
    // Get all services (for admin)
    static async getAllServices(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${API_BASE_URL}/api/admin/services${queryString ? `?${queryString}` : ''}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error fetching all services:', error);
            throw error;
        }
    }
    
    // Get active services (for public use)
    static async getActiveServices() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/services`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data || [];
            
        } catch (error) {
            console.error('Error fetching active services:', error);
            throw error;
        }
    }
    
    // Get service by ID
    static async getServiceById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data;
            
        } catch (error) {
            console.error('Error fetching service:', error);
            throw error;
        }
    }
    
    // Create new service
    static async createService(serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    }
    
    // Update service
    static async updateService(id, serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error updating service:', error);
            throw error;
        }
    }
    
    // Delete service
    static async deleteService(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
        }
    }
    
    // Toggle service status
    static async toggleServiceStatus(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error toggling service status:', error);
            throw error;
        }
    }
}

// Icon mapping for React Icons
export const ICON_OPTIONS = [
    { value: 'FaCode', label: 'Code', icon: '💻' },
    { value: 'FaGraduationCap', label: 'Education', icon: '🎓' },
    { value: 'FaUsers', label: 'Users/Team', icon: '👥' },
    { value: 'FaRocket', label: 'Rocket', icon: '🚀' },
    { value: 'FaChartLine', label: 'Analytics', icon: '📈' },
    { value: 'FaMobile', label: 'Mobile', icon: '📱' },
    { value: 'FaCloud', label: 'Cloud', icon: '☁️' },
    { value: 'FaShoppingCart', label: 'E-commerce', icon: '🛒' },
    { value: 'FaCog', label: 'Settings', icon: '⚙️' },
    { value: 'FaDatabase', label: 'Database', icon: '🗄️' },
    { value: 'FaLaptop', label: 'Laptop', icon: '💻' },
    { value: 'FaServer', label: 'Server', icon: '🖥️' },
    { value: 'FaGlobe', label: 'Globe', icon: '🌐' },
    { value: 'FaShield', label: 'Security', icon: '🛡️' },
    { value: 'FaHeart', label: 'Heart', icon: '❤️' }
];

// Button action options
export const BUTTON_ACTION_OPTIONS = [
    { value: 'disabled', label: 'Disabled' },
    { value: 'link', label: 'External Link' },
    { value: 'contact', label: 'Contact Form' },
    { value: 'modal', label: 'Modal Dialog' }
];

// Service status options
export const STATUS_OPTIONS = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'red' },
    { value: 'coming-soon', label: 'Coming Soon', color: 'yellow' }
];

// Category options
export const CATEGORY_OPTIONS = [
    { value: 'Development', label: 'Development' },
    { value: 'Education', label: 'Education' },
    { value: 'Community', label: 'Community' },
    { value: 'Other', label: 'Other' }
];

export default ServiceAPI;
