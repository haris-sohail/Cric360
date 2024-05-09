import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/ViewMatch.css'
import axios from 'axios'
import BattingScoreCard from './BattingScoreCard'
import BowlingScoreCard from './BowlingScoreCard'

function ViewMatch() {
    const location = useLocation()
    const data = location.state
    const username = data.username
    const matchStats = data.matchStats
    const [teamAInningsClicked, setTeamAInningsClicked] = useState(true)
    const [teamBInningsClicked, setTeamBInningsClicked] = useState(false)
    let useEffectCalled = false

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true
        }
    }, [])

    return (
        <div className='view-match-container'>
            <Navbar username={username} />

            <div className='main-content-container-view-match'>
                <div className='innings-selector-container'>
                    <a onClick={(e) => { setTeamAInningsClicked(true); setTeamBInningsClicked(false) }}
                        className={teamAInningsClicked ? `innings-clicked` : ''}>
                        <p>{matchStats.innings[0].teamName.toUpperCase()}'s INNINGS</p>
                    </a>

                    <a onClick={(e) => { setTeamBInningsClicked(true); setTeamAInningsClicked(false) }}
                        className={teamBInningsClicked ? `innings-clicked` : ''}>
                        <p>{matchStats.innings[1].teamName.toUpperCase()}'s INNINGS</p>
                    </a>
                </div>

                <div className='batting-and-bowling-score-card-container'>
                    <div className='batting-score-card-container-view-match'>
                        <BattingScoreCard inningsVal={teamAInningsClicked ? matchStats.innings[0] : matchStats.innings[1]} />
                    </div>

                    <div className='bowling-score-card-container-view-match'>
                        <BowlingScoreCard inningsVal={teamAInningsClicked ? matchStats.innings[0] : matchStats.innings[1]} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewMatch