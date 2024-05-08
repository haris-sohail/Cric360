import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/EndMatch.css'

function EndMatch() {
    const location = useLocation()
    const data = location.state
    const teamWon = data.teamWon
    const isDrawn = data.isDrawn
    const username = data.username
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/home', { state: { username } })
        }, 2000);

        return () => clearTimeout(timeout);

    }, [navigate]);
    
    return (
        <div className='end-match-container'>
            {(!isDrawn) && (
                <h2>Match won by team {teamWon}</h2>
            )}

            {(isDrawn) && (
                <h2>Match drawn</h2>
            )}
        </div>
    )
}

export default EndMatch