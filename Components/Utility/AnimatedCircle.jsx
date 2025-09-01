"use client"
import React from 'react';

const AnimatedCircle = ({
    // Position props
    position = "absolute",
    top,
    bottom,
    left,
    right,
    
    // Size props - responsive sizes
    size = {
        base: "w-8 h-8",      // mobile
        sm: "sm:w-12 sm:h-12", // small screens
        md: "md:w-20 md:h-20", // medium screens
        lg: "lg:w-32 lg:h-32"  // large screens
    },
    
    // Color and styling props
    backgroundColor = "bg-blue-400/20",
    darkBackgroundColor = "dark:bg-sky-400/30",
    opacity = "opacity-40 sm:opacity-60",
    
    // Animation props
    animation = "animate-pulse",
    animationDelay = "",
    
    // Visibility props
    hiddenOnSmall = false,
    hiddenOnMedium = false,
    hiddenOnLarge = false,
    
    // Custom classes
    className = "",
    
    // Style prop for inline styles
    style = {}
}) => {
    // Build responsive size classes
    const sizeClasses = typeof size === 'string' 
        ? size 
        : `${size.base} ${size.sm || ''} ${size.md || ''} ${size.lg || ''}`.trim();
    
    // Build visibility classes
    const visibilityClasses = [
        hiddenOnSmall && "hidden sm:block",
        hiddenOnMedium && "hidden md:block", 
        hiddenOnLarge && "hidden lg:block"
    ].filter(Boolean).join(" ");
    
    // Build animation classes
    const animationClasses = `${animation} ${animationDelay}`.trim();
    
    // Combine all classes
    const combinedClasses = [
        position,
        sizeClasses,
        backgroundColor,
        darkBackgroundColor,
        "rounded-full",
        animationClasses,
        visibilityClasses,
        className
    ].filter(Boolean).join(" ");
    
    // Build position styles
    const positionStyles = {
        ...(top && { top }),
        ...(bottom && { bottom }),
        ...(left && { left }),
        ...(right && { right }),
        ...style
    };
    
    return (
        <div 
            className={combinedClasses}
            style={positionStyles}
        />
    );
};

// Predefined circle configurations for common use cases
export const CirclePresets = {
    small: {
        size: {
            base: "w-4 h-4",
            sm: "sm:w-6 sm:h-6", 
            md: "md:w-12 md:h-12",
            lg: "lg:w-20 lg:h-20"
        }
    },
    medium: {
        size: {
            base: "w-8 h-8",
            sm: "sm:w-12 sm:h-12",
            md: "md:w-20 md:h-20", 
            lg: "lg:w-32 lg:h-32"
        }
    },
    large: {
        size: {
            base: "w-10 h-10",
            sm: "sm:w-16 sm:h-16",
            md: "md:w-24 md:h-24",
            lg: "lg:w-40 lg:h-40"
        }
    },
    extraLarge: {
        size: {
            base: "w-8 h-8",
            sm: "sm:w-14 sm:h-14",
            md: "md:w-28 md:h-28",
            lg: "lg:w-36 lg:h-36"
        }
    }
};

// Color presets for different themes
export const ColorPresets = {
    blue: {
        backgroundColor: "bg-blue-400/20",
        darkBackgroundColor: "dark:bg-sky-400/30"
    },
    purple: {
        backgroundColor: "bg-sky-400/20", 
        darkBackgroundColor: "dark:bg-purple-400/30"
    },
    teal: {
        backgroundColor: "bg-indigo-400/20",
        darkBackgroundColor: "dark:bg-teal-400/30"
    },
    pink: {
        backgroundColor: "bg-cyan-400/20",
        darkBackgroundColor: "dark:bg-pink-400/30"
    },
    violet: {
        backgroundColor: "bg-violet-400/20",
        darkBackgroundColor: "dark:bg-indigo-400/30"
    }
};

// Animation delay presets
export const DelayPresets = {
    none: "",
    short: "delay-500",
    medium: "delay-1000", 
    long: "delay-1500",
    extraLong: "delay-2000"
};

export default AnimatedCircle;
