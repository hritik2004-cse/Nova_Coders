import React from 'react';

const GradientButton = ({ children, href, onClick, size = 'md', className = '', type = 'button' }) => {
    const baseClasses = 'text-white font-bold inline-block cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105';
    const gradientClasses = 'bg-gradient-to-r from-blue-600 to-sky-400 dark:to-[#64ffda]';
    const glowClasses = 'shadow-[0_0_15px_rgba(59,130,246,0.4)] dark:shadow-[0_0_15px_rgba(100,255,218,0.3),_0_0_30px_rgba(59,130,246,0.4)]';
    const sizeClasses = {
        lg: 'py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg',
        md: 'py-2 px-5 md:py-3 md:px-6 rounded-lg text-sm md:text-base',
    };

    const combinedClasses = `${baseClasses} ${gradientClasses} ${glowClasses} ${sizeClasses[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
};

export default GradientButton;
