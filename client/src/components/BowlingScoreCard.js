import React, { useEffect, useState } from 'react'
import '../css/BowlingScoreCard.css'
import BowlerStatsMatch from './BowlerStatsMatch'

function BowlingScoreCard({ inningsVal }) {
    const [bowlerStats, setBowlerStats] = useState()
    const [bowlerStatsComponents, setBowlerStatsComponents] = useState()
    const [innings, setInnings] = useState(inningsVal)
    let useEffectCalled = false

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true
            console.log(inningsVal)
        }
    }, [])

    useEffect(() => {
        if (inningsVal) {
            // set the bowler stats according to the innings clicked
            setBowlerStats(inningsVal.bowlers)
        }
    }, [inningsVal]);

    useEffect(() => {
        if (bowlerStats) {
            const bowlingStatsComp = bowlerStats
                .filter(bowlerStats => bowlerStats.name)
                .map(bowlerStats => (
                <BowlerStatsMatch
                    key={bowlerStats._id}
                    name={bowlerStats.name}
                    runs={bowlerStats.runs}
                    overs={bowlerStats.overs}
                    balls={bowlerStats.balls}
                    wickets={bowlerStats.wickets}
                    economy={bowlerStats.economy}
                />
            ))

            setBowlerStatsComponents(bowlingStatsComp)
        }
    }, [bowlerStats])

    return (
        <div className='bowling-score-card-container'>
            <div className='bowling-stats-fixed-text-container'>
                <div className='name-container-bowler-stats-match'>
                    <p>NAME</p>
                </div>

                <div className='stats-container-bowler-stats-match'>
                    <div className='stats-fixed-text-container'><p>O</p></div>
                    <div className='stats-fixed-text-container'><p>R</p></div>
                    <div className='stats-fixed-text-container'><p>W</p></div>
                    <div className='stats-fixed-text-container'><p>Econ</p></div>
                </div>
            </div>

            {(bowlerStats && bowlerStatsComponents) && (
                bowlerStatsComponents
            )}
        </div>
    )
}

export default BowlingScoreCard