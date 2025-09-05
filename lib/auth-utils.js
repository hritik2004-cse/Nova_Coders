'use client';

import { safeLocalStorage, isClient } from './safe-storage';

/**
 * Enhanced authentication utilities focused on localStorage
 * (Cookies are handled server-side for better SSR compatibility)
 */

export const authUtils = {
    // Set token in localStorage (cookies handled server-side)
    setToken: (token) => {
        if (!isClient || !token) return false;
        
        try {
            // Set in localStorage for immediate access
            safeLocalStorage.setItem('authToken', token);
            return true;
        } catch (error) {
            console.warn('Failed to set auth token:', error);
            return false;
        }
    },

    // Get token from localStorage
    getToken: () => {
        if (!isClient) return null;
        
        try {
            return safeLocalStorage.getItem('authToken');
        } catch (error) {
            console.warn('Failed to get auth token:', error);
            return null;
        }
    },

    // Remove token from localStorage (cookies cleared server-side)
    removeToken: () => {
        if (!isClient) return false;
        
        try {
            safeLocalStorage.removeItem('authToken');
            return true;
        } catch (error) {
            console.warn('Failed to remove auth token:', error);
            return false;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = authUtils.getToken();
        return !!token;
    },

    // Get auth headers for API calls
    getAuthHeaders: () => {
        const token = authUtils.getToken();
        
        if (!token) {
            return {};
        }
        
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
};

export default authUtils;
