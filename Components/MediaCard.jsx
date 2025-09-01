import * as React from 'react';

export default function MediaCard() {
    return (
        <div className="max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
            <div 
                className="h-35 bg-cover bg-center" 
                style={{ backgroundImage: "url('/static/images/cards/contemplative-reptile.jpg')" }}
                aria-label="green iguana"
            />
            <div className="p-6">
                <h5 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Lizard
                </h5>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </p>
            </div>
            <div className="px-6 pb-6 flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 dark:text-sky-400 hover:text-blue-800 dark:hover:text-sky-300 transition-colors">
                    Share
                </button>
                <button className="px-3 py-1 text-sm text-blue-600 dark:text-sky-400 hover:text-blue-800 dark:hover:text-sky-300 transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    );
}
