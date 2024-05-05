import React, { useEffect, useState } from 'react'
import '../css/Innings.css'
import BatsmanInnings from './BatsmanInnings'
import BowlingInnings from './BowlingInnings'
import ScoreMachine from './ScoreMachine'

function Innings({ matchStatsID, battingTeam, bowlingTeam }) {
    const [totalRuns, setTotalRuns] = useState(0)
    const [wickets, setWickets] = useState(0)
    const [overs, setOvers] = useState(0.0)

    useEffect(() => {
        console.log(battingTeam, bowlingTeam)
    })
    return (
        <div className='innings-container'>
            <div className='inning-stats-container-inning'>
                <h6>{totalRuns}/{wickets} ({overs})</h6>
            </div>
            <div className='batsmen-innings-container-innings'>
                <BatsmanInnings battingTeam={battingTeam} />
                <BatsmanInnings battingTeam={battingTeam} />
            </div>

            <div className='bowling-and-scoremachine-container'>
                <BowlingInnings bowlingTeam={bowlingTeam} />

                <ScoreMachine />
            </div>

        </div>
    )
}

export default Innings