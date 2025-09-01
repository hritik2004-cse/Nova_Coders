"use client"
import React, { useEffect, useState } from 'react';
import GradientButton from './Utility/GradientButton';
import StatsBar from './Utility/StatsBar';
import AnimatedCircle, { CirclePresets, ColorPresets, DelayPresets } from './Utility/AnimatedCircle';
import Globe from './Utility/Globe';
import { FiArrowRight, FiUsers } from 'react-icons/fi';
import { Skeleton } from '@/Components/ui/skeleton';

const HeroSection = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading time for demo purposes
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Stats data for the StatsBar component
    const statsData = [
        {
            value: 500,
            label: "Participants",
            countUp: true,
            duration: 2000
        },
        {
            value: 50,
            label: "Members", 
            countUp: true,
            duration: 2000
        },
        {
            value: "24/7",
            label: "Active",
            countUp: false
        }
    ];

    return (
        <section className="relative min-h-screen w-full overflow-hidden" style={{
            background: `linear-gradient(to bottom right, var(--bg-light), var(--bg), var(--bg-dark))`
        }}>
            {/* Background Animated Circles */}
            <div className="absolute inset-0 z-0 opacity-40 sm:opacity-60">
                <AnimatedCircle 
                    top="15%" 
                    left="5%" 
                    {...CirclePresets.medium}
                    {...ColorPresets.blue}
                    animationDelay={DelayPresets.none}
                />
                
                <AnimatedCircle 
                    top="25%" 
                    right="3%" 
                    {...CirclePresets.large}
                    {...ColorPresets.purple}
                    animationDelay={DelayPresets.medium}
                />
                
                <AnimatedCircle 
                    bottom="40%" 
                    left="8%" 
                    {...CirclePresets.small}
                    {...ColorPresets.teal}
                    animationDelay={DelayPresets.short}
                    hiddenOnSmall={true}
                />
                
                <AnimatedCircle 
                    bottom="50%" 
                    right="10%" 
                    {...CirclePresets.extraLarge}
                    {...ColorPresets.pink}
                    animationDelay={DelayPresets.long}
                    hiddenOnMedium={true}
                />
                
                <AnimatedCircle 
                    top="60%" 
                    left="40%" 
                    {...CirclePresets.small}
                    {...ColorPresets.violet}
                    animationDelay={DelayPresets.extraLong}
                    hiddenOnLarge={true}
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center min-h-screen py-12 md:py-16 lg:py-20">

                        {/* Text Content */}
                        <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 lg:pr-8">
                            {isLoading ? (
                                <div className="space-y-3 w-full">
                                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-12 xl:h-14 2xl:h-16 w-full max-w-md mx-auto lg:mx-0" />
                                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-12 xl:h-14 2xl:h-16 w-full max-w-sm mx-auto lg:mx-0" />
                                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-12 xl:h-14 2xl:h-16 w-full max-w-xs mx-auto lg:mx-0" />
                                </div>
                            ) : (
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight animate-fade-in-down">
                                    <span className="block" style={{ color: 'var(--text)' }}>Ignite Your Code.</span>
                                    <span className="block" style={{ color: 'var(--text)' }}>Connect. Create.</span>
                                    <span className="bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text block">Conquer.</span>
                                </h1>
                            )}

                            {isLoading ? (
                                <div className="space-y-2 w-full max-w-2xl">
                                    <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-7 w-full" />
                                    <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-7 w-full" />
                                    <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-7 w-3/4 mx-auto lg:mx-0" />
                                </div>
                            ) : (
                                <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl max-w-2xl animate-fade-in-up px-4 lg:px-0" style={{
                                    color: 'var(--text-muted)',
                                    animationDelay: '0.3s'
                                }}>
                                    Your next great project starts here. Connect with a passionate community of developers and designers dedicated to learning, sharing, and innovating together.
                                </p>
                            )}

                            {isLoading ? (
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 md:gap-5 lg:gap-6 w-full max-w-lg lg:max-w-xl xl:max-w-2xl px-4 lg:px-0">
                                    <Skeleton className="h-12 md:h-14 lg:h-16 w-full sm:w-32 md:w-36 lg:w-40 rounded-full" />
                                    <Skeleton className="h-12 md:h-14 lg:h-16 w-full sm:w-36 md:w-40 lg:w-44 rounded-full" />
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 md:gap-5 lg:gap-6 w-full max-w-lg lg:max-w-xl xl:max-w-2xl animate-fade-in-up px-4 lg:px-0" style={{ animationDelay: '0.6s' }}>
                                    <GradientButton href="#" size="lg" className="gap-2 w-full sm:w-auto whitespace-nowrap">
                                        Join Now <FiArrowRight className="w-4 h-4" />
                                    </GradientButton>
                                    <a
                                        href="/about"
                                        className="py-3 md:py-3.5 lg:py-4 px-6 md:px-7 lg:px-8 rounded-full text-sm md:text-base font-bold backdrop-blur-sm border transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap shadow-lg"
                                        style={{
                                            backgroundColor: 'var(--bg)',
                                            color: 'var(--text)',
                                            borderColor: 'var(--highlight)',
                                            borderWidth: '2px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = 'var(--highlight)';
                                            e.target.style.color = 'var(--bg-light)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'var(--bg)';
                                            e.target.style.color = 'var(--text)';
                                        }}
                                    >
                                        View Community <FiUsers className="w-4 h-4" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Globe Component - Only visible on lg+ screens */}
                        <div className="hidden lg:flex items-center justify-center">
                            {isLoading ? (
                                <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
                                    <Skeleton className="w-full aspect-square rounded-full" />
                                </div>
                            ) : (
                                <Globe 
                                    size="w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
                                    animate={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-3xl px-4 z-20">
                <StatsBar 
                    stats={statsData}
                    isLoading={isLoading}
                    showGradientHover={true}
                    animationDelay="0.9s"
                />
            </div>
        </section>
    );
};

export default HeroSection;
