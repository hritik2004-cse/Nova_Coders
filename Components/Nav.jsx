import React from 'react';
import Logo from './Utility/Logo';
import Navlinks from "@/Components/Utility/Navlinks";
import GradientButton from './Utility/GradientButton';
import LoginButton from './Utility/LoginButton';
import MenuBar from './Utility/MenuBar';
import { ModeToggle } from './ModeToggle';

const Nav = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg border-b border-gray-200 dark:border-[#233554] bg-white/80 dark:bg-[#0A192F]/85">
            <div className='container mx-auto flex justify-between h-20 items-center px-6'>
                {/* Logo - always visible */}
                <Logo />

                {/* Desktop Navigation (Visible on md screens and up) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Navlinks />
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center space-x-4">
                        <LoginButton />
                        <a href="#">
                            <GradientButton size="md">Join Now</GradientButton>
                        </a>
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Menu Bar (Visible on screens smaller than md) */}
                <div className="md:hidden">
                    <MenuBar />
                </div>
            </div>
        </header>
    )
}

export default Nav;
