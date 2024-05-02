import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/CreateMatch.css'
import Navbar from './Navbar';

function CreateMatch() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();
    const [startingAt, setStartinAt] = useState()
    const [venue, setVenue] = useState()
    const [format, setFormat] = useState()
    const [teamA, setTeamA] = useState()

    return (
        <div className='create-match-container'>
            <Navbar username={username} />

            <h1>Creating a Match</h1>
            <div className='text-input-create-match'>
                
            </div>
        </div>
    )
}

export default CreateMatch