import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/MatchHandler.css'
import toast from 'react-hot-toast'
import Innings from './Innings'

function MatchHandler() {
    const location = useLocation()
    const data = location.state
    const tossWonBy = data.tossWonBy
    const electedTo = data.electedTo
    const tossLostBy = data.tossLostBy
    const [battingTeam, setBattingTeam] = useState();
    const [bowlingTeam, setBowlingTeam] = useState();
    const [matchStatsID, setMatchStatsID] = useState()
    const [loading, setLoading] = useState(false);
    let useEffectCalled = false

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true

            setLoading(true);

            if (electedTo == "bat") {
                setBattingTeam(tossWonBy);
                setBowlingTeam(tossLostBy);
            } else {
                setBattingTeam(tossLostBy);
                setBowlingTeam(tossWonBy);
            }

            // make match details
            axios.post('http://localhost:3001/matchStats/createMatchStats', { tossWonBy, electedTo, tossLostBy })
                .then(res => {
                    if (res.data) {
                        setMatchStatsID(res.data.id);
                    }
                })
                .catch(err => {
                    toast.error("Error creating match stats, can not reach server");
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }, []);

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
                    <Innings matchStatsID={matchStatsID} battingTeam={battingTeam} bowlingTeam={bowlingTeam} inningNoVal={'0'}/>
                </div>
            </div>
        )
    }
}

export default MatchHandler