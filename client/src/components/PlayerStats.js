import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/PlayerStats.css'

function PlayerStats({ username, playerDetails }) {
    const navigate = useNavigate()

    const handlePlayerStatsClick = () => {
        navigate('/playerStatsDetails', { state: { username, playerDetails } })
    }
    return (
        <a onClick={handlePlayerStatsClick}>
            <div className='player-stats-container'>
                <h6>{playerDetails.username}</h6>
                <p><em>{playerDetails.teamName.toUpperCase()}</em></p>
            </div>
        </a>
    )
}

export default PlayerStats