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
                className="relative z-[100] transition-colors duration-300"
                style={{ color: 'var(--text)' }}
                aria-label="Toggle menu"
            >
                {isOpen ? <IoMdClose size={28} /> : <FaBars size={24} />}
            </button>

            {/* Full-screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-[99] h-screen w-full transform backdrop-blur-lg transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
                style={{ backgroundColor: 'var(--bg-light)' }}
            >
                <div className="flex flex-col h-full p-4 sm:p-6">
                    {/* Menu Header */}
                    <div className="flex justify-between items-center mb-8 sm:mb-12 pt-16">
                        <Logo className='text-center' />
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center flex-grow space-y-2">
                        {links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="w-full max-w-sm py-3 sm:py-4 text-center text-lg sm:text-xl font-semibold transition-all duration-300 rounded-lg relative overflow-hidden group"
                                style={{
                                    color: 'var(--text)',
                                    backgroundColor: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'var(--highlight)';
                                    e.target.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = 'var(--text)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                                {/* Animated border */}
                                <span 
                                    className="absolute inset-0 border-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: 'var(--highlight)' }}
                                ></span>
                            </a>
                        ))}
                    </nav>

                    {/* Action Buttons & Socials */}
                    <div className="mt-auto flex flex-col items-center gap-3 sm:gap-4 pb-8">
                        <GradientButton href="#" size="lg" className="w-full text-center max-w-xs">
                            Join Now
                        </GradientButton>
                        <LoginButton className="w-full max-w-xs" />
                        <Social
                            variant='navbar'
                            containerClassName="flex justify-center items-center space-x-4 mt-4 sm:mt-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar;
