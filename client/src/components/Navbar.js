import React from 'react'
import Logo from '../system/assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar({ username }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/home', { state: { username } })
    }

    const handleTeamsClick = () => {
        navigate('/teams', { state: { username } })
    }

    const handleMatchesClick = () => {
        navigate('/matches', { state: { username } })
    }

    return (
        <div className='navbar'>
            <a onClick={handleLogoClick} id='logo-link'>
                <img src={Logo} alt="logo" />
            </a>

            <div className='btns-container'>
                <a onClick={handleMatchesClick}>
                    <button><h6>Matches</h6></button>
                </a>

                <Link>
                    <button><h6>Stats</h6></button>
                </Link>

                <a onClick={handleTeamsClick}>
                    <button><h6>Teams</h6></button>
                </a>
            </div>
        </div>
    )
}

export default Navbar