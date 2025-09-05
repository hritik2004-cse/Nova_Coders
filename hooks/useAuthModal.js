"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

export function useAuthModal() {
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [currentModal, setCurrentModal] = useState('');

    // Close modals when user becomes authenticated
    useEffect(() => {
        if (isAuthenticated) {
            closeModals();
        }
    }, [isAuthenticated]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModals();
            }
        };

        if (showLoginModal || showSignupModal) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showLoginModal, showSignupModal]);

    const openLoginModal = () => {
        setCurrentModal('login');
        setShowLoginModal(true);
        setShowSignupModal(false);
    };
    
    const openSignupModal = () => {
        setCurrentModal('signup');
        setShowSignupModal(true);
        setShowLoginModal(false);
    };
    
    const closeModals = () => {
        setShowLoginModal(false);
        setShowSignupModal(false);
        setCurrentModal('');
    };

    const switchToLogin = () => {
        setCurrentModal('login');
        setShowLoginModal(true);
        setShowSignupModal(false);
    };

    const switchToSignup = () => {
        setCurrentModal('signup');
        setShowSignupModal(true);
        setShowLoginModal(false);
    };

    return {
        showLoginModal,
        showSignupModal,
        currentModal,
        openLoginModal,
        openSignupModal,
        closeModals,
        switchToLogin,
        switchToSignup,
        isAuthenticated, // Add authentication state
    };
}
