import React from 'react'
import '../css/BatsmanStatsMatch.css'
function BatsmanStatsMatch({ name, runs, balls }) {
    return (
        <div className='batsman-stats-match-container'>
            <div className='name-container-batsman-stats'>
                <h6>{name}</h6>
            </div>

            <div className='stats-container-batsman-stats'>
                <p>{runs}({balls})</p>
            </div>
        </div>
    )
}

export default BatsmanStatsMatch