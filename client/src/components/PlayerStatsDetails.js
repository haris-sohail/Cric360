import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/PlayerStatsDetails.css'

function PlayerStatsDetails() {
    const location = useLocation()
    const data = location.state
    const username = data.username
    const playerDetails = data.playerDetails

    return (
        <div className='player-stats-details-container'>
            <div className='player-details-container-player-stats-details'>
                <h3>{playerDetails.username}</h3>
                <h5><em>{playerDetails.teamName.toUpperCase()}</em></h5>
            </div>

            <div className='player-stats-container-player-stats-details'>
                <div className='batting-and-bowling-stats-container'>
                    <div className='batting-stats-player'>
                        <h3>BATTING</h3>
                        <div className='stats-text-container-player-stats'>
                            <h6>RUNS: {playerDetails.runsScored}</h6>
                            <h6>BALLS: {playerDetails.ballsFaced}</h6>
                            <h6>AVERAGE: {playerDetails.battingAvg.toFixed(2)}</h6>
                            <h6>SR: {playerDetails.SR}</h6>
                            <h6>MATCHES: {playerDetails.noMatches}</h6>
                        </div>

                    </div>
                    <div className='bowling-stats-player'>
                        <h3>BOWLING</h3>
                        <div className='stats-text-container-player-stats'>
                            <h6>OVERS: {playerDetails.oversBowled}.{playerDetails.ballsBowled}</h6>
                            <h6>RUNS: {playerDetails.runsConceded}</h6>
                            <h6>WICKETS: {playerDetails.wicketsTaken}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerStatsDetails
