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
    const [isCaptain, setIsCaptain] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (matches) {
            const matchesComponents = matches.map(match => (
                <Match
                    key={match.id}
                    id={match.id}
                    venue={match.venue}
                    startingAt={match.startingAt}
                    teamA={match.teamA}
                    format={match.format}
                    isLive={match.isLive}
                    username={username}
                />
            ));
            setMatchesComponent(matchesComponents)
            setLoading(false)
        }
    }, [matches]);

    useEffect(() => {
        setLoading(true)
        // hide create match button if user is not captain
        hideCreateMatchButton();

        // load all matches
        loadMatches();
    }, [])

    const loadMatches = async () => {
        try {
            const res = await axios.post('http://localhost:3001/match/getMatches')
                .finally(() => {
                    setLoading(false)
                })

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
        axios.post('http://localhost:3001/player/getPlayer', { username })
            .then(res => {
                if (!res.data.isCaptain || res.data.isCaptain == false) {
                    // hide the create match button
                    setIsCaptain(false)
                }
                else {
                    setIsCaptain(true)
                }
            })
    }

    const handleCreateMatch = () => {
        navigate('/createMatch', { state: { username } })
    }

    if (loading) {
        return null
    }
    return (
        <div className='matches-container'>
            <Navbar username={data.username} />

            <div className='matches-container-main-content'>
                {isCaptain && (
                    <div id='button-container-matches-container'>
                        <button onClick={handleCreateMatch} id='create-match-btn-matches-page'><h6>Create Match</h6></button>
                    </div>
                )}
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