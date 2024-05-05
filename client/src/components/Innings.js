import React, {useEffect, useState} from 'react'
import '../css/Innings.css'
import BatsmanInnings from './BatsmanInnings'
import BowlingInnings from './BowlingInnings'

function Innings({ matchStatsID, battingTeam, bowlingTeam }) {
    useEffect(() => {
        console.log(battingTeam, bowlingTeam)
    })
    return (
        <div className='innings-container'>
            <BatsmanInnings battingTeam={battingTeam}/>
            <BatsmanInnings battingTeam={battingTeam} />
            
            <BowlingInnings bowlingTeam={bowlingTeam} />
            

        </div>
    )
}

export default Innings