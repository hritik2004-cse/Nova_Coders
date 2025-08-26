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
    url: 'https://www.linkedin.com/company/novacoders007/posts/?feedView=all',
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/nova_coders_007/',
  },
  {
    name: 'Github',
    icon: <FiGithub />,
    url: 'https://github.com/novacoders007',
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/your-profile',
  },
];

const Social = ({ variant = 'footer', containerClassName = '' }) => {

  const iconStyles = {
    footer: "w-10 h-10 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#112240] dark:text-gray-300 dark:hover:bg-[#233554]",
    navbar: "w-9 h-9 bg-transparent text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-[#64ffda]",
  };

  const baseIconStyles = "rounded-full flex items-center justify-center cursor-pointer transition-all duration-300";

  const combinedIconStyles = `${baseIconStyles} ${iconStyles[variant]}`;

  return (
    <div className={containerClassName}>
      {socialIcons.map((social, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
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