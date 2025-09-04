'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import GradientButton from '@/Components/Utility/GradientButton';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login, user, loading } = useAuth();

    // Check if already logged in
    useEffect(() => {
        if (!loading && user) {
            // Check if user has admin privileges
            const adminRoles = ['admin', 'super_admin', 'moderator'];
            if (adminRoles.includes(user.role)) {
                router.push('/admin');
            } else {
                setError('You do not have administrative privileges.');
            }
        }
    }, [user, loading, router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await login(formData.email, formData.password);
            
            if (result.success) {
                // Check if user has admin privileges
                const userRole = result.user.role;
                const adminRoles = ['admin', 'super_admin', 'moderator'];
                
                if (adminRoles.includes(userRole)) {
                    router.push('/admin');
                } else {
                    setError("You don't have administrative privileges.");
                }
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br dark:from-ui-bg-dark dark:via-ui-bg dark:to-ui-bg-light flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-ui-highlight/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ui-primary/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Card className="bg-gradient-to-br from-blue-600/10 to-sky-400/10 dark:from-ui-highlight/10 dark:to-ui-primary/10 backdrop-blur-xl border border-blue-200/20 dark:border-ui-highlight/20 shadow-2xl">
                    {/* Glassmorphism background elements */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-sky-400/20 dark:from-ui-highlight/20 dark:to-ui-primary/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-sky-400/20 to-blue-500/20 dark:from-ui-primary/20 dark:to-ui-highlight/20 rounded-full blur-2xl"></div>
                    </div>

                    <CardContent className="relative z-10 p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-ui-highlight to-ui-primary rounded-full flex items-center justify-center text-2xl text-white shadow-lg mx-auto mb-4">
                                <FaLock />
                            </div>
                            <CardTitle className="text-2xl font-bold mb-2 text-ui-text">
                                Admin Login
                            </CardTitle>
                            <CardDescription className="text-ui-text-muted">
                                Enter your credentials to access the admin panel
                            </CardDescription>
                        </div>

                        {/* Error message */}
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Login form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-ui-text mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-4 w-4 text-ui-text-muted" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-ui-border rounded-lg bg-white/50 dark:bg-ui-bg-light/50 backdrop-blur-sm text-ui-text placeholder-ui-text-muted focus:outline-none focus:ring-2 focus:ring-ui-highlight focus:border-transparent transition-all duration-300"
                                        placeholder="admin@novacoders.com"
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-ui-text mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-ui-text-muted" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-ui-border rounded-lg bg-white/50 dark:bg-ui-bg-light/50 backdrop-blur-sm text-ui-text placeholder-ui-text-muted focus:outline-none focus:ring-2 focus:ring-ui-highlight focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-ui-text-muted hover:text-ui-text transition-colors duration-200"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Login button */}
                            <GradientButton
                                type="submit"
                                disabled={isLoading || !formData.email || !formData.password}
                                className="w-full flex items-center justify-center"
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        <FaLock className="mr-2" />
                                        Login to Admin Panel
                                    </>
                                )}
                            </GradientButton>
                        </form>

                        {/* RBAC Setup info */}
                        <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                <strong>Setup Instructions:</strong><br />
                                1. Run the super admin creation script<br />
                                2. Use your super admin credentials to login<br />
                                3. Manage users and roles from the admin panel
                            </p>
                            <p className="text-blue-700 dark:text-blue-300 text-xs mt-2">
                                🔐 RBAC system is now active - role-based access control enabled
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
