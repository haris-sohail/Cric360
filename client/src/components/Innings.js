import React from 'react'
import '../css/Innings.css'
import BattingInnings from './BattingInnings'

function Innings({ battingTeam, bowlingTeam }) {
    return (
        <div className='innings-container'>
            <BattingInnings battingTeam={battingTeam} />
        </div>
    )
}

export default Innings