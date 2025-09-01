import React from 'react';

const LoginButton = ({ onClick, isLoading = false, className = '' }) => {
    const baseClasses =
        'flex items-center justify-center space-x-2 px-6 py-3 text-blue-600 border border-blue-300/60 dark:border-slate-600 rounded-lg dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';

    const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

    const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

    return (
        <button onClick={onClick} className={combinedClasses} disabled={isLoading}>
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>Logging in...</span>
                </>
            ) : (
                <>
                    {/* This is the FiLogIn icon as an inline SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span>Login</span>
                </>
            )}
        </button>
    );
};

export default LoginButton;
