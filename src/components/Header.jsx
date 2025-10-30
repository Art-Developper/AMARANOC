import React from "react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="py-4 font-sans ">
            <div className="container mx-auto flex items-center justify-between px-4">

                <Link  to={"/"} className="flex">
                    <img src={logo} alt="amaranoc_logo" className="w-36 h-11" />
                </Link>


                <nav className="flex items-center gap-8 text-lg font-medium">
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
                    <Link to={"/login"} className="flex items-center gap-4 text-xl">
                        <FaUser className="cursor-pointer " />
                    </Link>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Որոնում..."
                            className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 w-48" // Որոնման դաշտի ոճավորում
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;