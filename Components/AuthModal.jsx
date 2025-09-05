"use client"
import React from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthModal({ 
    showLoginModal, 
    showSignupModal, 
    currentModal, 
    onClose, 
    onSwitchToLogin, 
    onSwitchToSignup 
}) {
    if (!showLoginModal && !showSignupModal) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content - Perfectly Centered */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                {currentModal === 'login' && (
                    <LoginForm 
                        onClose={onClose}
                        onSwitchToSignup={onSwitchToSignup}
                        className="animate-in fade-in-0 zoom-in-95 duration-300"
                    />
                )}
                {currentModal === 'signup' && (
                    <SignupForm 
                        onClose={onClose}
                        onSwitchToLogin={onSwitchToLogin}
                        className="animate-in fade-in-0 zoom-in-95 duration-300"
                    />
                )}
            </div>
        </div>
    );
}
