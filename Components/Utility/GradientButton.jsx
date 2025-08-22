import React from 'react';

const GradientButton = ({ children, href, onClick, size = 'md', className = '', type = 'button' }) => {
    const baseClasses = 'btn-primary text-white font-bold inline-block glow-effect cursor-pointer';

    const sizeClasses = {
        lg: 'py-4 px-10 rounded-full text-lg',
        md: 'py-3 px-6 rounded-lg text-center',
    };

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

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

