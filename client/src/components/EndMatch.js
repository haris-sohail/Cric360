import React from 'react'
import { useLocation } from 'react-router-dom'
function EndMatch() {
    const location = useLocation()
    const data = location.state
    const teamWon = data.teamWon
    const isDrawn = data.isDrawn
    
    return (
        <div>
            {(!isDrawn) && (
                <h2>Match won by {teamWon}</h2>
            )}

            {(isDrawn) && (
                <h2>Match drawn</h2>
            )}
        </div>
    )
}

export default EndMatch