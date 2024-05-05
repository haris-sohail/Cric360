import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/MatchHandler.css'
import Innings from './Innings'

function MatchHandler() {
    const location = useLocation()
    const data = location.state
    const tossWonBy = data.tossWonBy
    const electedTo = data.electedTo
    const tossLostBy = data.tossLostBy
    const [battingTeam, setBattingTeam] = useState();
    const [bowlingTeam, setBowlingTeam] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (electedTo == "bat") {
            setBattingTeam(tossWonBy)
            setBowlingTeam(tossLostBy)
        }

        else {
            setBattingTeam(tossLostBy)
            setBowlingTeam(tossWonBy)
        }

        setLoading(false);
    }, [])

    if (loading) {
        return null;
    }
    else {
        return (
            <div className='match-handler-container'>
                <div className='match-handler-live-container'>
                    <h6>LIVE</h6>
                    <div className='blink-dot-live-container'></div>
                </div>
                <div className='innings-container-match-handler'>
                    <Innings battingTeam={battingTeam} bowlingTeam={bowlingTeam} />
                </div>
            </div>
        )
    }
}

export default MatchHandler