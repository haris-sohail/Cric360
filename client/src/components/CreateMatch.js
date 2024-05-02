import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/CreateMatch.css'
import Navbar from './Navbar';

function CreateMatch() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();

    return (
        <div className='create-match-container'>
            <Navbar username={username} />
            
            
        </div>
    )
}

export default CreateMatch