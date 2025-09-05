import React from 'react';

const GradientButton = ({ 
    children, 
    href, 
    onClick, 
    size = 'md', 
    className = '', 
    type = 'button', 
    disabled = false,
    ...props 
}) => {
    const baseClasses = 'text-white font-bold cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center';
    const gradientClasses = 'bg-gradient-to-r from-blue-600 to-sky-400 dark:to-[#64ffda]';
    const glowClasses = 'shadow-[0_0_15px_rgba(59,130,246,0.4)] dark:shadow-[0_0_15px_rgba(100,255,218,0.3),_0_0_30px_rgba(59,130,246,0.4)]';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : '';
    
    const sizeClasses = {
        lg: 'py-3 md:py-3.5 lg:py-4 px-6 md:px-7 lg:px-8 rounded-full text-sm md:text-base',
        md: 'py-2 px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-6 rounded-lg text-xs md:text-sm lg:text-base',
        custom: 'rounded-lg', // Only applies border radius for custom sizes
    };

    const combinedClasses = `${baseClasses} ${gradientClasses} ${glowClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                {children}
            </a>
        );
    }

    return (
        <button 
            type={type} 
            onClick={disabled ? undefined : onClick} 
            disabled={disabled}
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
};

export default GradientButton;
