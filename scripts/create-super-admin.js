// Script to create the first super admin user
import mongoose from 'mongoose';
import User from '../backend/models/User.js';
import dotenv from 'dotenv';

console.log('🚀 Super Admin Creation Script Starting...');

// Load environment variables
dotenv.config({ path: './.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/novacoders';

async function createSuperAdmin() {
    try {
        console.log('Starting super admin creation...');
        console.log('MongoDB URI:', MONGODB_URI);
        
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        // Check if super admin already exists
        const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
        
        if (existingSuperAdmin) {
            console.log('ℹ️  Super admin already exists:', existingSuperAdmin.email);
            await mongoose.disconnect();
            return;
        }
        
        // Create super admin with environment variables
        const superAdminData = {
            username: 'superadmin',
            email: process.env.DEFAULT_SUPER_ADMIN_EMAIL || 'change@example.com',
            password: process.env.DEFAULT_SUPER_ADMIN_PASSWORD || 'CHANGE_THIS_PASSWORD',
            firstName: 'Super',
            lastName: 'Admin',
            department: 'Operations'
        };
        
        // Warn if using default credentials
        if (!process.env.DEFAULT_SUPER_ADMIN_EMAIL || !process.env.DEFAULT_SUPER_ADMIN_PASSWORD) {
            console.warn('⚠️  WARNING: Using default credentials. Please set environment variables!');
            console.warn('⚠️  Set DEFAULT_SUPER_ADMIN_EMAIL and DEFAULT_SUPER_ADMIN_PASSWORD in .env.local');
        }
        
        console.log('Creating super admin with data:', {
            username: superAdminData.username,
            email: superAdminData.email,
            firstName: superAdminData.firstName,
            lastName: superAdminData.lastName,
            department: superAdminData.department,
            password: '***hidden***'
        });
        
        const superAdmin = await User.createSuperAdmin(superAdminData);
        console.log('🎉 Super admin created successfully!');
        console.log('📧 Email:', superAdmin.email);
        console.log('👤 Username:', superAdmin.username);
        console.log('🔐 Role:', superAdmin.role);
        console.log('⚠️  Please change the default password after first login!');
        
        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error creating super admin:', error);
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
        process.exit(1);
    }
}

// Run the script
createSuperAdmin();
