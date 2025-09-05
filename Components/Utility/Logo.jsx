import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ className = '' }) => {
    const baseClasses = 'flex items-center gap-2 md:gap-3 font-bold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105';

    const logoClasses = 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain';

    // Matching your logo colors: cyan blue gradient with white accents
    const textClasses = 'text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-400 via-sky-500 to-cyan-400 dark:from-cyan-300 dark:via-sky-400 dark:to-cyan-300 text-transparent bg-clip-text';

    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <Link href="/" className={combinedClasses} aria-label="Navigate to homepage">
            <Image 
                src="/logo.png" 
                alt="Nova Coders Logo" 
                width={64} 
                height={64} 
                className={logoClasses}
                priority
            />
            <span className={textClasses}>Nova Coders</span>
        </Link>
    );

};

export default Logo;
