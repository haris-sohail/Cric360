import React from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/Matches.css'

function Matches() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();

    const handleCreateMatch = () => {
        navigate('/createMatch', { state: { username } })
    }

    return (
        <div className='matches-container'>
            <Navbar username={data.username} />

            <button onClick={handleCreateMatch} id='create-match-btn-matches-page'><h6>Create Match</h6></button>

            
        </div>
    )
}

export default Matches