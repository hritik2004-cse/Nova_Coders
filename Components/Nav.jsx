"use client"
import React from 'react';
import Logo from './Utility/Logo';
import Navlinks from "@/Components/Utility/Navlinks";
import MenuBar from './Utility/MenuBar';
import { ModeToggle } from './ModeToggle';
import { AuthModal } from './AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useAuth } from '@/lib/auth-context';
import { FiLogIn, FiUserPlus, FiLogOut, FiUser } from 'react-icons/fi';
import GradientButton from './Utility/GradientButton';

const Nav = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const {
        showLoginModal,
        showSignupModal,
        currentModal,
        openLoginModal,
        openSignupModal,
        closeModals,
        switchToLogin,
        switchToSignup,
        isAuthenticated: modalAuthState,
    } = useAuthModal();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg border-b"
            style={{
                borderBottomColor: 'var(--highlight)',
                backgroundColor: 'var(--bg-light)',
                backdropFilter: 'blur(16px)',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                opacity: 0.95
            }}
        >
            <div className='container mx-auto flex justify-between h-20 items-center px-6'>
                {/* Logo - always visible */}
                <Logo />

                {/* Desktop Navigation (Visible on md screens and up) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Navlinks />
                    <div className="w-px h-6" style={{ backgroundColor: 'var(--highlight)', opacity: 0.3 }}></div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* User Menu */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Welcome, {user?.firstName || user?.username}!
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 border border-red-300/60 dark:border-red-600 rounded-lg dark:text-red-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50/50 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* Login Button */}
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center justify-center space-x-2 px-4 py-2 h-10 text-blue-600 border border-blue-300/60 dark:border-slate-600 rounded-lg dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm font-medium"
                                >
                                    <FiLogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </button>
                                
                                {/* Join Now Button */}
                                <GradientButton
                                    onClick={openSignupModal}
                                    className="flex items-center justify-center space-x-2 px-4 py-2 h-10 text-sm font-medium"
                                    size="custom"
                                >
                                    <FiUserPlus className="w-4 h-4" />
                                    <span>Join Now</span>
                                </GradientButton>
                            </div>
                        )}
                        
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Menu Bar (Visible on screens smaller than md) */}
                <div className="md:hidden flex items-center space-x-3">
                    {isAuthenticated ? (
                        <>
                            <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-20">
                                {user?.firstName || user?.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center p-2 text-red-600 border border-red-300/60 dark:border-red-600 rounded-lg dark:text-red-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50/50 transition-colors duration-300"
                            >
                                <FiLogOut className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            {/* Mobile Login Button */}
                            <button
                                onClick={openLoginModal}
                                className="flex items-center justify-center p-2 h-10 w-10 text-blue-600 border border-blue-300/60 dark:border-slate-600 rounded-lg dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors duration-300"
                            >
                                <FiLogIn className="w-4 h-4" />
                            </button>
                            
                            {/* Mobile Join Button */}
                            <GradientButton
                                onClick={openSignupModal}
                                className="flex items-center justify-center p-2 h-10 w-10"
                                size="custom"
                            >
                                <FiUserPlus className="w-4 h-4" />
                            </GradientButton>
                        </div>
                    )}
                    
                    <MenuBar 
                        onOpenLogin={openLoginModal}
                        onOpenSignup={openSignupModal}
                        isAuthenticated={isAuthenticated}
                        user={user}
                        onLogout={handleLogout}
                    />
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal
                showLoginModal={showLoginModal}
                showSignupModal={showSignupModal}
                currentModal={currentModal}
                onClose={closeModals}
                onSwitchToLogin={switchToLogin}
                onSwitchToSignup={switchToSignup}
            />
        </header>
    )
}

export default Nav;
