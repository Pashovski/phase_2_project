import React from 'react'
import { Link } from "react-router-dom";

function Header(){
    return(
    <nav className="navbar">
        <img src="https://www.corttsmoni.com/img/logo.png" alt="Logo" height="100px" align="left"/>
        <ul className="nav-links">
            <Link to='/about'>
                <li>About</li>
            </Link>
            <Link to='/home'>
                <li>Home</li>
            </Link>
        </ul>
    </nav>
    )
}

export default Header;