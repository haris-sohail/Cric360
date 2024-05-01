import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import Team from './Team'
import '../css/Teams.css'

function Teams() {
    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    const handleRegisterTeam = () => {
        navigate('/registerTeam', { state: { username } })
    }
    return (
        <div className='teams-container'>
            <Navbar username={username} />
            <button onClick={handleRegisterTeam}><h6>Register a team</h6></button>

            <Team />
        </div>
    )
}

export default Teams