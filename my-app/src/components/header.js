import {React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
function Header(){
    const [bool, setBool] = useState(null);
    useEffect(() => {
        const nav = document.querySelector(".header-nav")
        if(bool){
            nav.classList.add("expanded-nav");
            nav.classList.remove("minimized-nav");
        }else{
            nav.classList.remove("expanded-nav");
            nav.classList.add("minimized-nav");
        }
    });
    return(
        <header className='header'>
            <Link className="header-name" to="/">The Ice Wagon</Link>
            <nav className='header-nav'>
                <Link className='header-path' to="/calculator/">Calculator</Link>
                <Link className='header-path' to="/customer/">Customers</Link>
                <Link className='header-path' to="/">Routes</Link>
                <Link className='header-path' to="/">Call Ins</Link> 
                <Link className='header-path' to="/">Check In</Link>      
            </nav>
            <button className='header-expand-button' onClick={() => setBool(bool !== null ? !bool : false )} href="/">
                <svg className='header-expand-icon'>
                    <rect className='expand-icon-border' x="0" y="25" width="50" height="50"/>
                    <rect className='expand-icon-bar' x="5" y="33" width="40" height="5"/>
                    <rect className='expand-icon-bar' x="5" y="47" width="40" height="5"/>
                    <rect className='expand-icon-bar' x="5" y="61" width="40" height="5"/>
                </svg>
            </button>
        </header>
    );
}

export default Header;