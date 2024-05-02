import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Match from './Match'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/Matches.css'

function Matches() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();
    const [matches, setMatches] = useState()
    const [matchesComponent, setMatchesComponent] = useState()

    useEffect(() => {
        if (matches) {
            const matchesComponents = matches.map(match => (
                <Match
                    id={match.id}
                    venue={match.venue}
                    startingAt={match.startingAt}
                    teamA={match.teamA}
                    format={match.format}
                    isLive={match.isLive}
                />
            ));
            setMatchesComponent(matchesComponents);
        }
        console.log(matches)
    }, [matches]);

    useEffect(() => {
        // hide create match button if user is not captain
        hideCreateMatchButton();

        // load all matches
        loadMatches();
    }, [])

    const loadMatches = async () => {
        try {
            const res = await axios.post('http://localhost:3001/match/getMatches')

            if (res) {
                setMatches(res.data);
            }
        }
        catch (err) {
            toast.error("Matches fetch failed. Server can not be reached.")
            console.log(err)
        }
    }

    const hideCreateMatchButton = () => {
        
    }
    
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
                    {matchesComponent ? matchesComponent :
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                            <CircularProgress />
                        </Box>
                    }
                </div>
            </div>

        </div>
    )
}

export default Matches