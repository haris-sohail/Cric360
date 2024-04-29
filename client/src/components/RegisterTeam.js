import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/RegisterTeam.css'

function RegisterTeam() {
    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    return (
        <div className='register-team-container'>
            
        </div>
    )
}

export default RegisterTeam