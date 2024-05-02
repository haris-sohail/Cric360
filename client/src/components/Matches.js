import React from 'react'
import Navbar from './Navbar'
import Match from './Match'
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

            <div className='matches-container-main-content'>

                <div id='button-container-matches-container'>
                    <button onClick={handleCreateMatch} id='create-match-btn-matches-page'><h6>Create Match</h6></button>
                </div>
                <div className='matches-main-content'>
                    <Match id={1} venue={"Pindi Cricket Stadium"} format={"ODI"} startingAt={"2024-05-30T19:35:00.000+00:00"} teamA={"stallions"} isLive={false} />

                </div>
            </div>

        </div>
    )
}

export default Matches