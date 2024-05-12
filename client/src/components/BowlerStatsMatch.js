import React from 'react'
import '../css/BowlerStatsMatch.css'

function BowlerStatsMatch({ name, balls, economy, overs, runs, wickets }) {
    return (
        <div className='bowler-stats-match-container'>
            <div className='name-container-bowler-stats-match'>
                <h6>{name}</h6>
            </div>

            <div className='stats-container-bowler-stats-match'>
                <div className='stats-fixed-text-container'><p>{overs}.{balls}</p></div>
                <div className='stats-fixed-text-container'><p>{runs}</p></div>
                <div className='stats-fixed-text-container'><p>{wickets}</p></div>
                <div className='stats-fixed-text-container'><p>{economy}</p></div>
            </div>
        </div>
    )
}

export default BowlerStatsMatch