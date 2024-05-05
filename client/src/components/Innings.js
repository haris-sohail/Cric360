import React, {useEffect, useState} from 'react'
import '../css/Innings.css'
import BatsmanInnings from './BatsmanInnings'

function Innings({ matchStatsID, battingTeam, bowlingTeam }) {
    return (
        <div className='innings-container'>
            <BatsmanInnings battingTeam={battingTeam}/>
            <BatsmanInnings battingTeam={battingTeam} />
            
            
        </div>
    )
}

export default Innings