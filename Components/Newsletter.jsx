"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GradientButton from './Utility/GradientButton';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        setIsLoading(true);

        try {
            // Save to database
            const dbResponse = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email.trim(),
                    firstName: firstName.trim() || email.split('@')[0]
                }),
            });

            // Send email via EmailJS
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

            if (!serviceId || !templateId) {
                toast.error('Email service not configured');
                return;
            }

            // Update hidden fields
            const emailField = formRef.current.querySelector('input[name="email"]');
            const nameField = formRef.current.querySelector('input[name="name"]');
            
            emailField.value = email.trim();
            nameField.value = firstName.trim() || email.split('@')[0];

            await emailjs.sendForm(serviceId, templateId, formRef.current);

            toast.success('🎉 Successfully subscribed! Check your inbox for a welcome email.');
            setEmail('');
            setFirstName('');

        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style jsx>{`
                .autofill-themed:-webkit-autofill,
                .autofill-themed:-webkit-autofill:hover,
                .autofill-themed:-webkit-autofill:focus,
                .autofill-themed:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px var(--bg) inset !important;
                    -webkit-text-fill-color: var(--text) !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
                .autofill-themed::placeholder {
                    color: var(--text-muted) !important;
                    opacity: 0.7;
                }
                
                .custom-toast-container .Toastify__toast {
                    background: var(--bg-light) !important;
                    color: var(--text) !important;
                    border: 1px solid var(--highlight) !important;
                    border-radius: 12px !important;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
                    backdrop-filter: blur(16px) !important;
                }
                
                .custom-toast-container .Toastify__toast--success {
                    border-left: 4px solid var(--success) !important;
                }
                
                .custom-toast-container .Toastify__toast--error {
                    border-left: 4px solid var(--danger) !important;
                }
                
                .custom-toast-container .Toastify__progress-bar {
                    background: var(--primary) !important;
                    height: 3px !important;
                }
            `}</style>
            <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="container mx-auto px-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg border"
                    style={{
                        backgroundColor: 'var(--bg-light)',
                        borderColor: 'var(--highlight)'
                    }}>

                    {/* Gradient Background Accent */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-500/10 to-transparent"></div>

                    <div className="relative z-10 p-8 md:p-12 lg:p-16">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Updated Header */}
                            <div className="mb-6">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                                    style={{ color: 'var(--text)' }}>
                                    Stay Updated with
                                    <span className="bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text ml-3">
                                        Nova Coders
                                    </span>
                                </h2>
                                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                                    style={{ color: 'var(--text-muted)' }}>
                                    Get exclusive insights, coding tips, and be the first to know about our latest projects and community events.
                                </p>
                            </div>

                            {/* Enhanced Form */}
                            <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mx-auto">
                                {/* Minimal hidden fields - only what your template needs */}
                                <input type="hidden" name="email" value="" />
                                <input type="hidden" name="name" value="" />

                                <div className="relative group mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative flex items-center rounded-xl overflow-hidden border backdrop-blur-sm"
                                         style={{ 
                                             backgroundColor: 'var(--bg)', 
                                             borderColor: 'var(--highlight)' 
                                         }}>
                                        <FiMail className="ml-4 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                                        <input
                                            type="text"
                                            placeholder="Your first name (optional)"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-transparent outline-none text-base transition-all placeholder:transition-colors autofill-themed"
                                            style={{ 
                                                color: 'var(--text)',
                                                '--placeholder-color': 'var(--text-muted)'
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="relative group mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative flex items-center rounded-xl overflow-hidden border backdrop-blur-sm"
                                         style={{ 
                                             backgroundColor: 'var(--bg)', 
                                             borderColor: 'var(--highlight)' 
                                         }}>
                                        <FiMail className="ml-4 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 px-4 py-4 bg-transparent outline-none text-base transition-all placeholder:transition-colors autofill-themed"
                                            style={{ 
                                                color: 'var(--text)',
                                                '--placeholder-color': 'var(--text-muted)'
                                            }}
                                            required
                                        />
                                        <div className="m-1">
                                            <GradientButton 
                                                type="submit" 
                                                size="md" 
                                                className="px-8 py-3 flex items-center gap-2 font-medium"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Subscribing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiSend className="w-4 h-4" />
                                                        Subscribe
                                                    </>
                                                )}
                                            </GradientButton>
                                        </div>
                                    </div>
                                </div>
                            </form>                            {/* Trust Indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-6 text-sm"
                                style={{ color: 'var(--text-muted)' }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>No spam, ever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Unsubscribe anytime</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Weekly updates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                className="custom-toast-container !text-sm"
                toastClassName="!rounded-xl !shadow-2xl"
                bodyClassName="!text-sm !font-medium"
                progressClassName="!h-1"
            />
        </section>
        </>
    );
};

export default Newsletter;
