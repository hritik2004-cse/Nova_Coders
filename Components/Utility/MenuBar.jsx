"use client"
import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import GradientButton from './GradientButton';
import LoginButton from './LoginButton';
import Social from './Social';
import Logo from './Logo';

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { label: "About", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Events", url: "/events" },
        { label: "Team", url: "/team" },
        { label: "Gallery", url: "/gallery" },
        { label: "Blog", url: "/blog" },
    ];

    return (
        <div className='block md:hidden'>
            {/* Menu Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[100] text-gray-800 dark:text-gray-200"
                aria-label="Toggle menu"
            >
                {isOpen ? <IoMdClose size={28} /> : <FaBars size={24} />}
            </button>

            {/* Full-screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-[99] h-screen w-full transform bg-white dark:bg-[#0A192F] transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Menu Header */}
                    <div className="flex justify-between items-center mb-12">
                        <Logo className='text-center' />
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center flex-grow">
                        {links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="w-full py-4 text-center text-xl font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-[#112240] rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Action Buttons & Socials */}
                    <div className="mt-auto flex flex-col items-center gap-4">
                        <GradientButton href="#" size="lg" className="w-full text-center max-w-xs">
                            Join Now
                        </GradientButton>
                        <LoginButton className="w-full max-w-xs" />
                        <Social
                            variant='navbar'
                            containerClassName="flex justify-center items-center space-x-4 mt-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar;
