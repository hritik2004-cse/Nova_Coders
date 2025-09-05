"use client"
import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import Social from './Social';
import Logo from './Logo';

const MenuBar = ({ onOpenLogin, onOpenSignup }) => {
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
                        {/* Join Now Button */}
                        <button
                            onClick={() => {
                                onOpenSignup();
                                setIsOpen(false);
                            }}
                            className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                        >
                            <FiUserPlus className="w-4 h-4" />
                            <span className="font-semibold">Join Now</span>
                        </button>
                        
                        {/* Login Button */}
                        <button
                            onClick={() => {
                                onOpenLogin();
                                setIsOpen(false);
                            }}
                            className="w-full max-w-xs py-3 px-6 text-blue-600 border border-blue-300/60 dark:border-slate-600 rounded-lg dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
                        >
                            <FiLogIn className="w-4 h-4" />
                            <span className="font-semibold">Login</span>
                        </button>
                        
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
