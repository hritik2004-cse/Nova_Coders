import React from 'react'

const Navlinks = () => {

    const links = [
        { label: "About", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Events", url: "/events" },
        { label: "Team", url: "/team" },
        { label: "Gallery", url: "/gallery" },
        { label: "Blog", url: "/blog" },
    ];

    return (
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {links.map((link) => (
                <a key={link.url} href={link.url} className="text-white text-lg hover:-translate-y-1 transition duration-200 hover:text-sky-400">
                    {link.label}
                </a>
            ))}
        </div>
    )
}

export default Navlinks
