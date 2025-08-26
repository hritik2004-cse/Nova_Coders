import React from 'react';

const Logo = ({ className = '' }) => {
    const baseClasses = 'font-bold tracking-wider transition-opacity duration-300 ease-in-out hover:opacity-80';

    const responsiveClasses = 'text-2xl md:text-3xl';

    const gradientTextClasses = 'bg-gradient-to-r from-blue-600 to-sky-400 dark:to-[#64ffda] text-transparent bg-clip-text';

    const bracketClasses = 'text-blue-600 dark:text-[#64ffda]';

    const combinedClasses = `${baseClasses} ${responsiveClasses} ${className}`;

    return (
        <a href="/" className={combinedClasses} aria-label="Navigate to homepage">
            <span className={bracketClasses}>&lt;</span>
            <span className={gradientTextClasses}>Nova Coders</span>
            <span className={bracketClasses}>/&gt;</span>
        </a>
    );
};

export default Logo;
