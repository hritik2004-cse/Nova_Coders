import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

const socialIcons = [
  {
    name: 'Linkedin',
    icon: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/in/your-profile', // <-- Add your URL
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/your-profile', // <-- Add your URL
  },
  {
    name: 'Github',
    icon: <FiGithub />,
    url: 'https://github.com/your-profile', // <-- Add your URL
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/your-profile', // <-- Add your URL
  },
];

const Social = ({ variant = 'footer', containerClassName = '' }) => {

  // --- Define Styles for Each Variant ---
  const iconStyles = {
    footer: "w-10 h-10 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#112240] dark:text-gray-300 dark:hover:bg-[#233554]",
    navbar: "w-9 h-9 bg-transparent text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-[#64ffda]",
  };

  const baseIconStyles = "rounded-full flex items-center justify-center cursor-pointer transition-all duration-300";

  // Combine the base styles with the chosen variant's styles
  const combinedIconStyles = `${baseIconStyles} ${iconStyles[variant]}`;

  return (
    <div className={containerClassName}>
      {socialIcons.map((social, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            {/* Wrap the icon in a link */}
            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              <div className={combinedIconStyles}>
                {social.icon}
              </div>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{social.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default Social;