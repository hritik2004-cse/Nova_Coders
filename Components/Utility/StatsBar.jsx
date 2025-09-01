"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/Components/ui/skeleton';

const useCountUp = (end, duration = 2000, shouldStart = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!shouldStart) {
            setCount(0);
            setHasStarted(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted && shouldStart) {
                    setHasStarted(true);
                    let start = 0;
                    const startTime = Date.now();
                    const step = () => {
                        const progress = Math.min((Date.now() - startTime) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    };
                    requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [end, duration, hasStarted, shouldStart]);

    return { count, ref };
};

const StatsBar = ({ 
    stats = [], 
    isLoading = false, 
    className = "",
    containerClassName = "",
    showGradientHover = true,
    animationDelay = "0.9s" 
}) => {
    return (
        <div className={`backdrop-blur-lg rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl border-2 border-t-4 p-2 sm:p-3 lg:p-4 xl:p-5 animate-fade-in-up transition-all duration-300 hover:shadow-3xl group relative overflow-hidden ${containerClassName}`}
            style={{
                backgroundColor: 'var(--bg-light)',
                borderColor: 'var(--border)',
                borderTopColor: 'var(--highlight)',
                animationDelay: animationDelay,
                transition: 'all 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
            }}
        >
            {/* Gradient background effect on hover */}
            {showGradientHover && (
                <div
                    className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, var(--highlight), var(--bg-light))`
                    }}
                ></div>
            )}
            
            <div className={`flex justify-center items-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 relative z-10 ${className}`} style={{ color: 'var(--text-muted)' }}>
                {stats.map((stat, index) => (
                    <React.Fragment key={stat.label}>
                        <StatItem 
                            {...stat} 
                            isLoading={isLoading}
                        />
                        {index < stats.length - 1 && (
                            <div
                                className="h-5 sm:h-6 lg:h-7 xl:h-8 w-px transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent, var(--border), transparent)'
                                }}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const StatItem = ({ value, label, countUp = false, duration = 2000, isLoading, shouldStart = true }) => {
    const countUpHook = useCountUp(countUp ? value : 0, duration, shouldStart && countUp);
    const displayValue = countUp ? countUpHook.count : value;
    const ref = countUp ? countUpHook.ref : null;

    return (
        <div 
            ref={ref}
            className="text-center p-2 sm:p-3 lg:p-3 rounded-lg transition-all duration-300 hover:scale-105 group-hover:bg-opacity-80"
            style={{
                backgroundColor: 'transparent'
            }}
        >
            {isLoading ? (
                <>
                    <Skeleton className="h-6 sm:h-7 lg:h-8 xl:h-10 w-10 sm:w-12 lg:w-14 xl:w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 sm:h-4 lg:h-4 w-12 sm:w-14 lg:w-16 mx-auto" />
                </>
            ) : (
                <>
                    <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black block transition-colors duration-300" style={{ color: 'var(--text)' }}>
                        {typeof displayValue === 'number' && countUp ? displayValue.toLocaleString() : displayValue}{countUp && '+'}
                    </span>
                    <p className="text-sm sm:text-sm lg:text-base xl:text-base font-semibold transition-colors duration-300">{label}</p>
                </>
            )}
        </div>
    );
};

export default StatsBar;
