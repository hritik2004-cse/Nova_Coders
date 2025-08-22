import React from 'react'
import Logo from './Utility/Logo'
import Navlinks from "@/Components/Utility/Navlinks";
import GradientButton from './Utility/GradientButton';
import LoginButton from './Utility/LoginButton';

const Nav = () => {
    return (
        <div className='w-full flex justify-between items-center pt-6 px-6 backdrop-blur-lg lg:px-20'>
            <Logo />
            <Navlinks />
            <div className="flex justify-center items-center space-x-4">
                <a href="">
                    <GradientButton>Join Now</GradientButton>
                </a>
                <LoginButton />
            </div>
        </div>
    )
}

export default Nav
