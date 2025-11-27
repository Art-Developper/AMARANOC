import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <header className="py-4 font-sans ">
            <div className="container mx-auto flex items-center justify-between px-4">

                <Link to={"/AMARANOC.git"} className="flex">
                    <img src={logo} alt="amaranoc_logo" className="w-36 h-11" />
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
                    <Link to={"/AMARANOC.git"} className="text-black hover:underline hover:decoration-orange-500 transition-colors">
                        Գլխավոր էջ
                    </Link>
                    <Link to={"/discounts"} className="text-black hover:underline hover:decoration-orange-500 transition-colors">
                        Զեղչեր
                    </Link>
                    <Link to={"/services"} className="text-black hover:underline hover:decoration-orange-500 transition-colors">
                        Ծառայություններ
                    </Link>
                    <Link to={"/about"} className="text-black  hover:underline hover:decoration-orange-500 transition-colors">
                        Մեր Մասին
                    </Link>
                </nav>


                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="hidden lg:flex items-center gap-4 text-sm">
                            <span className="text-black">{user.email}</span>
                            <button onClick={handleSignOut} className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                                Դուրս գալ
                            </button>
                            <Link to={"/chat"} className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                                Չատ
                            </Link>
                        </div>
                    ) : (
                        <Link to={"/login"} className="hidden lg:flex items-center gap-4 text-xl">
                            <FaUser className="cursor-pointer " />
                        </Link>
                    )}

                    <div className="relative hidden custom-md:block">
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

                <div className="lg:hidden flex items-center">
                    <Menu right width={'100%'} customBurgerIcon={<HamburgerIcon />} outerContainerId={"root"} pageWrapId={"page-wrap"}>
                        <Link id="home" className="menu-item" to="/">Գլխավոր էջ</Link>
                        <Link id="about" className="menu-item" to="/discounts">Զեղչեր</Link>
                        <Link id="contact" className="menu-item" to="/services">Ծառայություններ</Link>
                        <Link id="about-us" className="menu-item" to="/about">Մեր Մասին</Link>
                        {user ? (
                            <>
                                <span className="menu-item text-white">{user.email}</span>
                                <button onClick={handleSignOut} className="menu-item bg-orange-500 text-white rounded-md p-2 m-2">
                                    Դուրս գալ
                                </button>
                                
                                <Link to={"/chat"} className="menu-item bg-orange-500 text-white text-center rounded-md p-2 m-2">
                                    Չատ
                                </Link>
                            </>
                        ) : (
                            <Link id="login" className="menu-item" to="/login">Մուտք</Link>
                        )}


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