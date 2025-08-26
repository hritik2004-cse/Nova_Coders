import React from 'react';
import Logo from './utility/Logo';
import Social from './Utility/Social';

const AppFooter = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#112240] border-t border-gray-200 dark:border-[#233554]">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 lg:col-span-5">
                        <Logo />
                        <p className="mt-4 text-gray-600 dark:text-[#8892b0] max-w-xs">
                            A vibrant community for developers, designers, and tech enthusiasts to collaborate, learn, and innovate.
                        </p>
                    </div>

                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-[#ccd6f6] mb-4">Community</h3>
                            <ul className="space-y-3">
                                <li><a href="/about" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">About</a></li>
                                <li><a href="/events" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Events</a></li>
                                <li><a href="/blog" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Blog</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-[#ccd6f6] mb-4">Help Center</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Discord Server</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-[#ccd6f6] mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-[#8892b0] hover:text-blue-600 dark:hover:text-[#64ffda] transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#233554] flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-[#8892b0] mb-4 sm:mb-0">
                        &copy; {new Date().getFullYear()} Nova Coders. All Rights Reserved.
                    </p>
                    <Social
                        variant="footer"
                        containerClassName="flex items-center space-x-4"
                    />
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
