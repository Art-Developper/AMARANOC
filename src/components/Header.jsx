import React from "react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu';

const Header = () => {
    return (
        <header className="py-4 font-sans ">
            <div className="container mx-auto flex items-center justify-between px-4">

                <Link to={"/"} className="flex">
                    <img src={logo} alt="amaranoc_logo" className="w-36 h-11" />
                </Link>

                {/* Սովորական նավիգացիան կթաքնվի փոքր էկրանների վրա, կհայտնվի LG (1024px) և ավելի մեծ էկրանների վրա */}
                <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
                    <Link to={"/"} className="text-black hover:decoration-orange-500 transition-colors">
                        Գլխավոր էջ
                    </Link>
                    <Link to={"/discounts"} className="text-black hover:decoration-orange-500 transition-colors">
                        Զեղչեր
                    </Link>
                    <Link to={"/services"} className="text-black hover:decoration-orange-500 transition-colors">
                        Ծառայություններ
                    </Link>
                    <Link to={"/about"} className="text-black  hover:decoration-orange-500 transition-colors">
                        Մեր Մասին
                    </Link>
                </nav>


                <div className="flex items-center gap-6">
                    {/* Մուտքի պատկերակը կհայտնվի LG (1024px) և ավելի մեծ էկրանների վրա */}
                    <Link to={"/login"} className="hidden lg:flex items-center gap-4 text-xl">
                        <FaUser className="cursor-pointer " />
                    </Link>

                    {/* Որոնման դաշտը կթաքնվի custom-md (900px) կամ նրանից փոքր էկրանների վրա,
                        կհայտնվի custom-md և ավելի մեծ էկրանների վրա */}
                    <div className="relative hidden custom-md:block"> {/* Ավելացնել hidden custom-md:block */}
                        <input
                            type="text"
                            placeholder="Որոնում..."
                            className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 w-48"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Burger մենյուն կհայտնվի LG (1024px)-ից փոքր էկրանների վրա */}
                <div className="lg:hidden flex items-center">
                    <Menu right width={'100%'} customBurgerIcon={<HamburgerIcon />} outerContainerId={"root"} pageWrapId={"page-wrap"}>
                        <Link id="home" className="menu-item" to="/">Գլխավոր էջ</Link>
                        <Link id="about" className="menu-item" to="/discounts">Զեղչեր</Link>
                        <Link id="contact" className="menu-item" to="/services">Ծառայություններ</Link>
                        <Link id="about-us" className="menu-item" to="/about">Մեր Մասին</Link>
                        <Link id="login" className="menu-item" to="/login">Մուտք</Link>
                        
                        {/* Որոնման դաշտը կհայտնվի մենյուի մեջ, երբ էկրանը custom-md-ից փոքր է */}
                        <div className="custom-md:hidden mt-8 px-4 w-full"> {/* Ավելացնել custom-md:hidden */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Որոնում..."
                                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 w-full" // w-full, որպեսզի լայն լինի մենյուի մեջ
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

const HamburgerIcon = () => (
    <div className="flex flex-col justify-around w-6 h-6">
        <div className="w-6 h-0.5 bg-black"></div>
        <div className="w-6 h-0.5 bg-black"></div>
        <div className="w-6 h-0.5 bg-black"></div>
    </div>
);

export default Header;