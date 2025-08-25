"use client"
import React, { useState } from 'react';
import "@/app/globals.css";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import GradientButton from './GradientButton';
import LoginButton from './LoginButton';
import Social from './Social';

const MenuBar = () => {

    let [modalStatus, setModalStatus] = useState(false);

    const links = [
        { label: "About", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Events", url: "/events" },
        { label: "Team", url: "/team" },
        { label: "Gallery", url: "/gallery" },
        { label: "Blog", url: "/blog" },
    ];

    return (
        <div className='block md:hidden'>
            <button className='modelicon' onClick={() => setModalStatus(!modalStatus)}>
                {modalStatus ?
                    <span><IoMdClose className='h-full w-full' /></span> :
                    <span><FaBars className='h-full w-full' /></span>
                }
            </button>
            <div className={`menu ${modalStatus ? "active" : ""}`}>
                <div className="flex flex-col items-center justify-center mt-6 ">
                    {links.map((link) => (
                        <a key={link.url} href={link.url} className="text-white text-lg font-bold py-3 hover:bg-sky-900 w-full text-center transition duration-200 hover:text-sky-400">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="mt-8 w-[90%] mx-auto">
                    <a href="">
                        <GradientButton className='w-full mx-auto'>Join Now</GradientButton>
                    </a>
                    <LoginButton className='w-full mt-5 mx-auto' />
                </div>
                <div className="">
                    <Social variant='navbar' containerClassName="flex justify-center items-center space-x-4 my-6" />
                </div>
            </div>
        </div>
    )
}

export default MenuBar
