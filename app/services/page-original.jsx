'use client';

import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import Nav from '@/Components/Nav';
import GradientButton from '@/Components/Utility/GradientButton';
import StatsBar from '@/Components/Utility/StatsBar';
import AnimatedCircle, { CirclePresets, ColorPresets, DelayPresets } from '@/Components/Utility/AnimatedCircle';

// Lazy load heavy components
const FooterClient = dynamic(() => import('@/Components/FooterClient'), {
  loading: () => <div className="min-h-[200px] bg-gray-100 dark:bg-gray-800 animate-pulse" />,
});

// Optimize icon imports
import { 
    FaCode, 
    FaUsers,
    FaGraduationCap,
    FaCalendarAlt,
    FaChevronDown,
    FaChevronUp,
    FaArrowRight,
    FaUserPlus,
    FaPaperPlane,
    FaTimes,
    FaCheckCircle
} from 'react-icons/fa';

// Service data with the new Event Organization service
const services = [
    {
        id: 'development',
        category: 'Development',
        title: 'Development Services',
        description: 'Create stunning, responsive websites and web applications using the latest technologies. Our team specializes in modern frameworks like React, Next.js, and Vue.js to deliver fast, scalable, and user-friendly web solutions that drive business growth.',
        icon: <FaCode />,
        features: [
            'Responsive Web Design',
            'Modern Frameworks (React, Next.js)',
            'Mobile App Development',
            'Performance Optimization'
        ],
        status: 'inactive',
        statusText: 'Currently Inactive'
    },
    {
        id: 'internship-program',
        category: 'Education',
        title: 'Internship Program',
        description: 'Join our comprehensive internship program designed to bridge the gap between academic learning and industry experience. Get hands-on training with real projects, mentorship from experienced developers, and career guidance.',
        icon: <FaGraduationCap />,
        features: [
            'Real-world Project Experience',
            '1-on-1 Mentorship',
            'Industry-relevant Skills',
            'Certificate & Job Placement'
        ],
        status: 'inactive',
        statusText: 'Currently Inactive'
    },
    {
        id: 'team-joining',
        category: 'Community',
        title: 'Join Our Team',
        description: 'Become part of our growing community of passionate developers, designers, and innovators. Whether you\'re a beginner or expert, we welcome talented individuals to collaborate, learn, and build amazing projects together.',
        icon: <FaUsers />,
        features: [
            'Collaborative Environment',
            'Skill Development',
            'Networking Opportunities',
            'Open Source Contributions'
        ],
        status: 'active',
        statusText: 'Currently Active'
    },
    {
        id: 'event-organization',
        category: 'Events',
        title: 'Event Organization',
        description: 'Professional event planning and management services for tech conferences, workshops, hackathons, and corporate events. We handle everything from venue booking to speaker coordination, ensuring memorable and successful events.',
        icon: <FaCalendarAlt />,
        features: [
            'Tech Conference Planning',
            'Workshop Organization',
            'Hackathon Management',
            'Corporate Event Coordination'
        ],
        status: 'active',
        statusText: 'Currently Active'
    }
];

// Community popup component
const CommunityPopup = ({ isOpen, onClose, onNeverShow }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUsers className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Be Part of Our Community
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Join Nova Coders and connect with passionate developers, get access to exclusive resources, and grow your skills with our supportive community.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        <GradientButton 
                            onClick={() => {
                                // Handle join community action
                                onClose();
                            }}
                            className="w-full"
                        >
                            <FaUserPlus className="w-4 h-4 mr-2" />
                            Join Community
                        </GradientButton>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                            >
                                Maybe Later
                            </button>
                            <button
                                onClick={() => {
                                    onNeverShow();
                                    onClose();
                                }}
                                className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                            >
                                Don't Show Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Service Card Component with independent read more functionality - Memoized for performance
const ServiceCard = React.memo(({ service }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    return (
        <Card className="group relative overflow-hidden backdrop-blur-lg border-2 border-t-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] rounded-xl"
            style={{
                backgroundColor: 'var(--bg-light)',
                borderColor: 'var(--border)',
                borderTopColor: 'var(--highlight)',
            }}>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--highlight-muted)' }}></div>
                <div className="absolute top-8 right-6 w-1 h-1 rounded-full animate-pulse delay-300" style={{ backgroundColor: 'var(--primary)' }}></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 rounded-full animate-bounce delay-500" style={{ backgroundColor: 'var(--secondary)' }}></div>
            </div>
            
            <div className="relative z-10 p-6 flex flex-col">
                {/* Icon with enhanced styling and proper centering */}
                <div className="mb-6 relative flex justify-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        style={{
                            background: 'linear-gradient(to bottom right, var(--highlight), var(--primary))'
                        }}>
                        <div className="flex items-center justify-center w-full h-full">
                            {service.icon}
                        </div>
                    </div>
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 scale-150 group-hover:scale-125 transition-all duration-500 blur-xl"
                        style={{ backgroundColor: 'var(--highlight)' }}></div>
                </div>

                {/* Category badge with improved design */}
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border"
                        style={{
                            backgroundColor: 'var(--highlight-muted)',
                            color: 'var(--text)',
                            borderColor: 'var(--highlight)'
                        }}>
                        <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: 'var(--highlight)' }}></div>
                        {service.category}
                    </span>
                    
                    {/* Status indicator */}
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        service.status === 'active' 
                            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' 
                            : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700'
                    }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                            service.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        } animate-pulse`}></div>
                        {service.statusText}
                    </span>
                </div>

                {/* Title with better typography */}
                <CardTitle className="text-xl font-bold mb-4 transition-colors duration-300 leading-tight" 
                    style={{ color: 'var(--text)' }}>
                    {service.title}
                </CardTitle>

                {/* Description with improved spacing - truncated when collapsed */}
                <CardDescription className="leading-relaxed mb-4" 
                    style={{ color: 'var(--text-muted)' }}>
                    {isExpanded ? service.description : `${service.description.slice(0, 100)}...`}
                </CardDescription>

                {/* Enhanced features list - shown only when expanded */}
                {isExpanded && (
                    <div className="space-y-3 mb-6">
                        {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center group/feature">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 group-hover/feature:scale-110 transition-transform duration-300"
                                    style={{
                                        background: 'linear-gradient(to right, var(--highlight), var(--primary))'
                                    }}>
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Read More / Collapse Button */}
                <button 
                    onClick={handleToggleExpand}
                    className="flex items-center gap-2 transition-colors duration-300 text-sm font-medium mb-4 self-start"
                    style={{ color: 'var(--highlight)' }}
                >
                    {isExpanded ? (
                        <>
                            <span>Show Less</span>
                            <FaChevronUp className="w-3 h-3" />
                        </>
                    ) : (
                        <>
                            <span>Read More</span>
                            <FaChevronDown className="w-3 h-3" />
                        </>
                    )}
                </button>

                {/* Enhanced CTA button using GradientButton */}
                <div className="mt-auto">
                    <GradientButton 
                        onClick={() => {}}
                        size="md"
                        disabled={service.status === 'inactive'}
                        className={`w-full flex items-center justify-center gap-2 ${
                            service.status === 'inactive' 
                                ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600' 
                                : ''
                        }`}
                    >
                        {service.id === 'team-joining' ? (
                            <>
                                <FaUserPlus className="w-4 h-4" />
                                <span>Join Now</span>
                            </>
                        ) : service.id === 'internship-program' ? (
                            <>
                                <FaPaperPlane className="w-4 h-4" />
                                <span>{service.status === 'inactive' ? 'Coming Soon' : 'Apply Now'}</span>
                            </>
                        ) : service.id === 'event-organization' ? (
                            <>
                                <FaCalendarAlt className="w-4 h-4" />
                                <span>Plan Event</span>
                            </>
                        ) : service.status === 'inactive' ? (
                            <>
                                <span>Coming Soon</span>
                                <FaArrowRight className="w-4 h-4 opacity-50" />
                            </>
                        ) : (
                            <>
                                <span>Learn More</span>
                                <FaArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </GradientButton>
                </div>
            </div>
        </Card>
    );
});

ServiceCard.displayName = 'ServiceCard';

export default function ServicesPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [neverShowAgain, setNeverShowAgain] = useState(false);

    // Check if user has dismissed the popup permanently
    useEffect(() => {
        const dismissed = localStorage.getItem('communityPopupDismissed');
        if (dismissed) {
            setNeverShowAgain(true);
        } else {
            // Show popup after 3 seconds
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNeverShow = useCallback(() => {
        localStorage.setItem('communityPopupDismissed', 'true');
        setNeverShowAgain(true);
    }, []);

    // Memoize stats data for better performance
    const statsData = useMemo(() => [
        {
            value: 4,
            label: "Services",
            countUp: true,
            duration: 2000
        },
        {
            value: 2,
            label: "Active", 
            countUp: true,
            duration: 2000
        },
        {
            value: "24/7",
            label: "Support",
            countUp: false
        },
        {
            value: 100,
            label: "Clients Served",
            countUp: true,
            duration: 2500
        }
    ], []);

    // Memoize filtered services for performance
    const { allServices, activeServices, inactiveServices } = useMemo(() => ({
        allServices: services,
        activeServices: services.filter(service => service.status === 'active'),
        inactiveServices: services.filter(service => service.status === 'inactive')
    }), []);

    const getFilteredServices = useCallback((filter) => {
        switch(filter) {
            case 'Active': return activeServices;
            case 'Inactive': return inactiveServices;
            default: return allServices;
        }
    }, [allServices, activeServices, inactiveServices]);

    // Memoize rendered service cards for better performance
    const renderServiceCards = useCallback((filter) => {
        const filteredServices = getFilteredServices(filter);
        return filteredServices.map((service) => (
            <div key={service.id} className="w-full">
                <ServiceCard service={service} />
            </div>
        ));
    }, [getFilteredServices]);

    return (
        <>
            <Nav />
            <div className="min-h-screen" style={{
                background: `linear-gradient(to bottom right, var(--bg-light), var(--bg), var(--bg-dark))`
            }}>
                {/* Background Animated Circles */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <AnimatedCircle
                        {...CirclePresets.medium}
                        {...ColorPresets.blue}
                        top="8%"
                        left="10%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.none}
                    />
                    <AnimatedCircle
                        {...CirclePresets.large}
                        {...ColorPresets.purple}
                        top="15%"
                        right="12%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.short}
                    />
                    <AnimatedCircle
                        {...CirclePresets.small}
                        {...ColorPresets.teal}
                        top="45%"
                        left="8%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.medium}
                    />
                    <AnimatedCircle
                        {...CirclePresets.extraLarge}
                        {...ColorPresets.pink}
                        top="55%"
                        right="15%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.long}
                    />
                    <AnimatedCircle
                        {...CirclePresets.medium}
                        {...ColorPresets.violet}
                        bottom="20%"
                        left="20%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.extraLong}
                    />
                    <AnimatedCircle
                        {...CirclePresets.large}
                        {...ColorPresets.blue}
                        bottom="12%"
                        right="8%"
                        animation="animate-pulse"
                        animationDelay={DelayPresets.short}
                    />
                </div>

                {/* Enhanced Hero Section */}
                <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Main Title with gradient */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            style={{
                                background: `linear-gradient(to right, var(--highlight), var(--primary), var(--secondary))`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                            Our Services
                        </h1>
                        
                        {/* Enhanced subtitle */}
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
                            style={{ color: 'var(--text-muted)' }}>
                            Explore our comprehensive services: Development solutions, Internship programs, Community membership, and Event organization. 
                            Join us to learn, grow, and build amazing projects together.
                        </p>

                        {/* Enhanced StatsBar using the main page design */}
                        <div className="flex justify-center mb-16">
                            <div className="w-full max-w-4xl">
                                <StatsBar 
                                    stats={statsData}
                                    isLoading={false}
                                    showGradientHover={true}
                                    animationDelay="0.5s"
                                    containerClassName="mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Services Section */}
                <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <Tabs defaultValue="All" className="w-full">
                            {/* Properly aligned Tabs List with only 3 tabs */}
                            <div className="flex justify-center mb-12 sm:mb-16">
                                <TabsList className="flex gap-2 p-2 backdrop-blur-lg border-2 border-t-4 shadow-2xl rounded-2xl"
                                    style={{
                                        backgroundColor: 'var(--bg-light)',
                                        borderColor: 'var(--border)',
                                        borderTopColor: 'var(--highlight)',
                                    }}>
                                    {['All', 'Active', 'Inactive'].map((tab) => (
                                        <TabsTrigger
                                            key={tab}
                                            value={tab}
                                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-transparent hover:scale-105 data-[state=active]:shadow-lg"
                                            style={{
                                                color: 'var(--text-muted)',
                                                borderColor: 'transparent'
                                            }}
                                            data-active-style={{
                                                background: `linear-gradient(to right, var(--highlight), var(--primary))`,
                                                color: 'white'
                                            }}
                                        >
                                            {tab}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {/* Enhanced Tabs Content */}
                            {['All', 'Active', 'Inactive'].map((filter) => (
                                <TabsContent key={filter} value={filter} className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                                        {renderServiceCards(filter)}
                                    </div>
                                    
                                    {/* Show message if no services in this category */}
                                    {getFilteredServices(filter).length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                                                No {filter.toLowerCase()} services available at the moment.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>

                {/* Community Popup */}
                <CommunityPopup 
                    isOpen={showPopup && !neverShowAgain}
                    onClose={() => setShowPopup(false)}
                    onNeverShow={handleNeverShow}
                />
            </div>
            <Suspense fallback={<div className="min-h-[200px] bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
                <FooterClient />
            </Suspense>
        </>
    );
}
