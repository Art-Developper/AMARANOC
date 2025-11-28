import React from 'react';
import logo from "../assets/img/logo.svg"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin"></div>
        <img src={logo} alt="Loading..." className="w-20 h-auto animate-pulse" />
      </div>
      <h2 className="mt-14 text-lg font-bold text-center text-orange-500 animate-bounce">
        ՇՈՒՏՈՎ ԿԲԱՑՎԻ...
      </h2>
    </div>
  );
};

export default Loader;