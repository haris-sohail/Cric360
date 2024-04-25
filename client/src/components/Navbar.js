import React from 'react'
import Logo from '../system/assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/home'>
                <img src={Logo} alt="logo" />
            </Link>

            <div className='btns-container'>
                <Link>
                    <button><h6>Matches</h6></button>
                </Link>

                <Link>
                    <button><h6>Stats</h6></button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
