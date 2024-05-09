import React, { useEffect, useState } from 'react'
import BatsmanStatsMatch from './BatsmanStatsMatch'
import '../css/BattingScoreCard.css'

function BattingScoreCard({ inningsVal }) {
    const [batsmenStats, setBatsmanStats] = useState()
    const [batsmenStatsComponents, setBatsmanStatsComponents] = useState()
    const [innings, setInnings] = useState(inningsVal)
    let useEffectCalled = false

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true
        }
    }, [])

    useEffect(() => {
        if (batsmenStats) {
            const batsmenStatsComp = batsmenStats
                .filter(batsmanStats => batsmanStats.name)
                .map(batsmanStats => (
                <BatsmanStatsMatch
                    key={batsmanStats._id}
                    name={batsmanStats.name}
                    runs={batsmanStats.runs}
                    balls={batsmanStats.balls}
                />
            ))

            setBatsmanStatsComponents(batsmenStatsComp)
        }
    }, [batsmenStats])

    useEffect(() => {
        if (inningsVal) {
            // set the batsmen stats according to the innings clicked
            setBatsmanStats(inningsVal.batsmen)
        }
    }, [inningsVal]);

    return (
        <div className='batting-score-card-container'>
            {(batsmenStats && batsmenStatsComponents) && (
                batsmenStatsComponents
            )}

        </div>
    )
}

export default BattingScoreCard