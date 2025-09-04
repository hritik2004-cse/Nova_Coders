'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getUserActions } from '@/lib/rbac';

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    actions: {}
};

// Action types
const ActionTypes = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
function authReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
            
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
                actions: getUserActions(action.payload)
            };
            
        case ActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
                actions: {}
            };
            
        case ActionTypes.UPDATE_USER:
            const updatedUser = { ...state.user, ...action.payload };
            return {
                ...state,
                user: updatedUser,
                actions: getUserActions(updatedUser)
            };
            
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
            
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
            
        default:
            return state;
    }
}

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    // Load user from localStorage on mount
    useEffect(() => {
        loadUser();
    }, []);
    
    // Load user from token
    const loadUser = async () => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            
            // Check if we have a token in localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                dispatch({ type: ActionTypes.SET_LOADING, payload: false });
                return;
            }
            
            // Fetch user profile
            const response = await fetch('/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data.user });
                } else {
                    localStorage.removeItem('authToken');
                    dispatch({ type: ActionTypes.SET_LOADING, payload: false });
                }
            } else {
                localStorage.removeItem('authToken');
                dispatch({ type: ActionTypes.SET_LOADING, payload: false });
            }
        } catch (error) {
            console.error('Load user error:', error);
            localStorage.removeItem('authToken');
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };
    
    // Login function
    const login = async (identifier, password) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data.user });
                return { success: true };
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: data.message });
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            const message = 'Login failed. Please try again.';
            dispatch({ type: ActionTypes.SET_ERROR, payload: message });
            return { success: false, message };
        }
    };
    
    // Register function
    const register = async (userData) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });
            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data.user });
                return { success: true };
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: data.message });
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Register error:', error);
            const message = 'Registration failed. Please try again.';
            dispatch({ type: ActionTypes.SET_ERROR, payload: message });
            return { success: false, message };
        }
    };
    
    // Logout function
    const logout = async () => {
        try {
            // Call logout API
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Clear local storage and state regardless of API call result
            localStorage.removeItem('authToken');
            dispatch({ type: ActionTypes.LOGOUT });
        }
    };
    
    // Update user profile
    const updateProfile = async (updates) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });
            
            const data = await response.json();
            
            if (data.success) {
                dispatch({ type: ActionTypes.UPDATE_USER, payload: data.user });
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, message: 'Failed to update profile' };
        }
    };
    
    // Change password
    const changePassword = async (currentPassword, newPassword) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            
            const data = await response.json();
            return { success: data.success, message: data.message };
        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, message: 'Failed to change password' };
        }
    };
    
    // Clear error
    const clearError = () => {
        dispatch({ type: ActionTypes.CLEAR_ERROR });
    };
    
    // Check if user has permission
    const hasPermission = (permission) => {
        return state.actions[permission] || false;
    };
    
    // Check if user has role
    const hasRole = (role) => {
        return state.user?.role === role;
    };
    
    // Check if user has minimum role
    const hasMinimumRole = (role) => {
        const roleHierarchy = {
            'guest': 0,
            'intern': 1,
            'member': 2,
            'moderator': 3,
            'admin': 4,
            'super_admin': 5
        };
        
        const userLevel = roleHierarchy[state.user?.role] || 0;
        const requiredLevel = roleHierarchy[role] || 0;
        
        return userLevel >= requiredLevel;
    };
    
    const value = {
        // State
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        actions: state.actions,
        
        // Actions
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        clearError,
        loadUser,
        
        // Permission helpers
        hasPermission,
        hasRole,
        hasMinimumRole
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
