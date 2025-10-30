import logo from "../assets/img/logo.svg";
import React from "react";


const Header = ()=>{
    return(
        <>
            <div className="flex">
                <div>
                    <img src={logo} alt="amaranoc_logo" />
                </div>
            </div>        
        </>
    )
}

export default Header;