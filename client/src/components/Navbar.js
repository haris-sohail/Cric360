import React from 'react'
import Logo from '../system/assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar({ username }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/home', { state: { username } })
    }
    return (
        <div className='navbar'>
            <a onClick={handleLogoClick} id='logo-link'>
                <img src={Logo} alt="logo" />
            </a>

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
