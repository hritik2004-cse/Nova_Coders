"use client"
import React from 'react'
import {createBrowserRoutes} from 'react-router-dom'
const Navlinks = () => {

    const links = [
        { label: "About", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Events", url: "/events" },
        { label: "Team", url: "/team" },
        { label: "Gallery", url: "/gallery" },
        { label: "Blog", url: "/blog" },
    ];

    return (
        <div className="hidden md:flex items-center space-y-4  md:space-y-0 md:space-x-6">
            {links.map((link) => (
                <a key={link.url} href={link.url} 
                    className="px-4 py-2 rounded-lg transition-all duration-300 relative group overflow-hidden"
                    style={{
                        color: 'var(--text)',
                        backgroundColor: 'transparent',
                        position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = 'var(--highlight)';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text)';
                        e.target.style.transform = 'translateY(0px)';
                    }}
                >
                    {link.label}
                    {/* Animated underline */}
                    <span 
                        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: 'var(--highlight)' }}
                    ></span>
                </a>
            ))}
        </div>
    )
}

export default Navlinks;
