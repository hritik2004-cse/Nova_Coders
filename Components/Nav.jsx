import React from 'react'
import Logo from './Utility/Logo'
import Navlinks from "@/Components/Utility/Navlinks";
import GradientButton from './Utility/GradientButton';
import LoginButton from './Utility/LoginButton';
import MenuBar from './Utility/MenuBar';
import { ModeToggle } from './ModeToggle';

const Nav = () => {
    return (
        <div className='w-full flex justify-between h-[11vh] items-center px-6 backdrop-blur-lg border-b border-gray-600 lg:px-20 fixed'>
            <div className="flex gap-3">
                <MenuBar />
                <Logo />
            </div>
            <Navlinks />
            <div className="hidden md:flex justify-center items-center space-x-4">
                <a href="">
                    <GradientButton className=''>Join Now</GradientButton>
                </a>
                <LoginButton />
                <ModeToggle/>
            </div>
        </div>
    )
}

export default Nav
