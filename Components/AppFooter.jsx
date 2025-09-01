import React from 'react';
import Logo from './Utility/Logo';
import Social from './Utility/Social';

const AppFooter = () => {
    return (
        <footer className="bg-white/95 backdrop-blur-sm dark:bg-blue-950/95 border-t border-blue-200/50 dark:border-blue-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 lg:col-span-5">
                        <Logo />
                        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-xs">
                            A vibrant community for developers, designers, and tech enthusiasts to collaborate, learn, and innovate.
                        </p>
                    </div>

                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Community</h3>
                            <ul className="space-y-3">
                                <li><a href="/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                                <li><a href="/events" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Events</a></li>
                                <li><a href="/blog" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Help Center</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Discord Server</a></li>
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-blue-200/50 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 sm:mb-0">
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
