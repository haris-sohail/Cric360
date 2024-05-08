import React from 'react'
import { useLocation } from 'react-router-dom'
import '../css/EndMatch.css'

function EndMatch() {
    const location = useLocation()
    const data = location.state
    const teamWon = data.teamWon
    const isDrawn = data.isDrawn
    
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