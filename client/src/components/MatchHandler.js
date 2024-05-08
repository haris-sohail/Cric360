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
    const username = data.username
    const [battingTeam, setBattingTeam] = useState();
    const [bowlingTeam, setBowlingTeam] = useState();
    const [matchStatsID, setMatchStatsID] = useState()
    const [innings1Score, setInnings1Score] = useState(0)
    const [loadInnings, setLoadInnings] = useState(true)
    let matchStatsIDVal;
    const [loading, setLoading] = useState(false);
    let useEffectCalled = false
    const [inningNo, setInningNo] = useState('0')
    const [scoreTeam1, setScoreTeam1] = useState()
    const [scoreTeam2, setScoreTeam2] = useState()
    const navigate = useNavigate()

    const updateTotalScoreTeam1 = (value) => {
        setScoreTeam1(value)
    }

    const updateTotalScoreTeam2 = (value) => {
        setScoreTeam2(value)
    }

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

    const updateInnings1Score = (value) => {
        setInnings1Score(value)
    }

    const updateEndMatchDB = (teamWon, teamLost, isDrawn) => {
        axios.post('http://localhost:3001/matchStats/updateEndMatch', { matchStatsID, teamWon, teamLost, isDrawn, username })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update end match, server unreachable")
            })
    }

    const handleEndInnings = () => {
        if (inningNo == '1') {
            if (scoreTeam1 > scoreTeam2) {
                const isDrawn = false
                updateEndMatchDB(tossWonBy, tossLostBy, false)
                if (!loading) {
                    navigate('/endmatch', { state: { teamWon: tossWonBy, isDrawn } })
                }
            }
            else if (scoreTeam1 < scoreTeam2) {
                const isDrawn = false
                updateEndMatchDB(tossLostBy, tossWonBy, false)
                if(!loading){
                    navigate('/endmatch', { state: { teamWon: tossLostBy, isDrawn } })
                }
            }
            else {
                const isDrawn = true
                updateEndMatchDB("", "", true)
                if(!loading){
                    navigate('/endmatch', { state: { teamWon: tossWonBy, isDrawn } })
                }
            }
        }
        else {
            setInningNo('1')

            // swap bowling and batting team values
            const temp = battingTeam;
            setBattingTeam(bowlingTeam);
            setBowlingTeam(temp);

            setLoadInnings(false)

            setTimeout(() => {
                setLoadInnings(true)
            }, 10)
        }

    }

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
                    {(loadInnings) && (
                        <Innings matchStatsID={matchStatsID} battingTeam={battingTeam} bowlingTeam={bowlingTeam} inningNoVal={inningNo}
                            updateInnings1Score={updateInnings1Score} target={innings1Score + 1} totalScoreTeam1={updateTotalScoreTeam1}
                            totalScoreTeam2={updateTotalScoreTeam2} tossWonBy={tossWonBy} tossLostBy={tossLostBy} />
                    )}
                </div>

                <div className='end-innings-container-match-handler'>
                    <button onClick={handleEndInnings}><h6>END</h6></button>
                </div>
            </div>
        )
    }
}

export default MatchHandler