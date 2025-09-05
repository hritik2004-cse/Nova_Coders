'use client';

/**
 * Safe localStorage utilities for Next.js SSR compatibility
 */

export const isClient = typeof window !== 'undefined';

export const safeLocalStorage = {
    getItem: (key) => {
        if (!isClient) return null;
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.warn('localStorage.getItem failed:', error);
            return null;
        }
    },
    
    setItem: (key, value) => {
        if (!isClient) return false;
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.warn('localStorage.setItem failed:', error);
            return false;
        }
    },
    
    removeItem: (key) => {
        if (!isClient) return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn('localStorage.removeItem failed:', error);
            return false;
        }
    }
};

export default safeLocalStorage;
