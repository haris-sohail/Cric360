import React, { useEffect, useState } from 'react'
import '../css/Innings.css'
import BatsmanInnings from './BatsmanInnings'
import BowlingInnings from './BowlingInnings'
import ScoreMachine from './ScoreMachine'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Innings({ matchStatsID, battingTeam, bowlingTeam, inningNoVal, updateInnings1Score, target, totalScoreTeam1,
    totalScoreTeam2, tossWonBy, tossLostBy, username }) {

    const [totalRuns, setTotalRuns] = useState(0)
    const [wickets, setWickets] = useState(0)
    const [overs, setOvers] = useState(0)
    const [balls, setBalls] = useState(0)
    const [inningNo, setInningNo] = useState(inningNoVal)
    const [buttonPressed, setButtonPressed] = useState('')
    const [batter1Facing, setBatter1Facing] = useState(true)
    const [batter2Facing, setBatter2Facing] = useState(false)
    const [loadBowler, setLoadBowler] = useState(true)
    const [loadBatsman1, setLoadBatsman1] = useState(true)
    const [loadBatsman2, setLoadBatsman2] = useState(true)
    const [isBatsman1Selected, setIsBatsman1Selected] = useState(false)
    const [isBatsman2Selected, setIsBatsman2Selected] = useState(false)
    const [isBowlerSelected, setIsBowlerSelected] = useState(false)
    const [batsmanNumber, setBatsmanNumber] = useState(0)
    const [extras, setExtras] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const updateBatter1Facing = (value) => {
        setBatter1Facing(value)
        setBatter2Facing(!value)
    }

    const updateBatter2Facing = (value) => {
        setBatter2Facing(value)
        setBatter1Facing(!value)
    }

    const handleButtonPress = (value) => {
        setButtonPressed(value);

        if (value == 'WD') {
            setTotalRuns(totalRuns + 1)
            setExtras(extras + 1)
        }
        else if (value == 'OUT') {
            setWickets(wickets + 1);
            setBalls(balls + 1)
        }
        else if (value == 'MISS') {
            setBalls(balls + 1)
        }
        else {
            setTotalRuns(totalRuns + value)
            setBalls(balls + 1)
        }
    };

    useEffect(() => {
        setButtonPressed('') // reset its value after it has been used
    }, [buttonPressed])

    useEffect(() => {
        // update the total runs
        if (totalRuns) {
            if (inningNoVal == 0) {
                updateInnings1Score(totalRuns)
            }

            if (battingTeam.toLowerCase() == tossWonBy.toLowerCase()) {
                totalScoreTeam1(totalRuns)
            }
            else if (bowlingTeam.toLowerCase() == tossWonBy.toLowerCase()) {
                totalScoreTeam2(totalRuns)
            }
            else if (battingTeam.toLowerCase() == tossLostBy.toLowerCase()) {
                totalScoreTeam2(totalRuns)
            }
            else if (bowlingTeam.toLowerCase() == tossLostBy.toLowerCase()) {
                totalScoreTeam1(totalRuns)
            }
        }

    }, [totalRuns])

    const updateEndMatchDB = (teamWon, teamLost, isDrawn) => {
        // update the end match in the database
        setLoading(true)
        axios.post('http://localhost:3001/matchStats/updateEndMatch', { matchStatsID, teamWon, teamLost, isDrawn })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update end match, server unreachable")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        // check if the match has ended
        if (totalRuns) {
            if (inningNoVal == 1) {
                if (totalRuns >= target) {
                    const isDrawn = false;
                    if (battingTeam.toLowerCase() == tossWonBy.toLowerCase()) {
                        setTimeout(() => {
                            updateEndMatchDB(tossWonBy, tossLostBy, false)
                            navigate('/endmatch', { state: { teamWon: tossWonBy, isDrawn, username } })
                        }, 10)
                    }
                    else if (bowlingTeam.toLowerCase() == tossWonBy.toLowerCase()) {
                        setTimeout(()=>{
                            updateEndMatchDB(tossLostBy, tossWonBy, false)
                            navigate('/endmatch', { state: { teamWon: tossLostBy, isDrawn, username } })
                        }, 10)
                    }
                    else if (battingTeam.toLowerCase() == tossLostBy.toLowerCase()) {
                        setTimeout(()=>{
                            updateEndMatchDB(tossLostBy, tossWonBy, false)
                            navigate('/endmatch', { state: { teamWon: tossLostBy, isDrawn, username } })
                        }, 10)
                    }
                    else if (bowlingTeam.toLowerCase() == tossLostBy.toLowerCase()) {
                        setTimeout(()=>{
                            updateEndMatchDB(tossWonBy, tossLostBy, false)
                            navigate('/endmatch', { state: { teamWon: tossWonBy, isDrawn, username } })
                        }, 10)
                    }
                }
            }
        }

    }, [totalRuns])

    useEffect(() => {
        // check if the match has ended
        axios.post('http://localhost:3001/matchStats/updateExtras', { extras, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update extras, server is unreachable")
            })
    }, [extras])

    useEffect(() => {
        // check if the match has ended
        if (balls > 5) {
            setBalls(0)
            setOvers(overs + 1)

            const tempFacing = batter1Facing;
            setBatter1Facing(batter2Facing);
            setBatter2Facing(tempFacing);
        }
    }, [balls])

    useEffect(() => {
        // update the total runs
        axios.post('http://localhost:3001/matchStats/updateTotalRuns', { totalRuns, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update total runs, server is unreachable")
            })
    }, [totalRuns])

    useEffect(() => {
        // update wickets
        axios.post('http://localhost:3001/matchStats/updateWickets', { wickets, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update wickets, server is unreachable")
            })
    }, [wickets])

    useEffect(() => {
        // update balls
        axios.post('http://localhost:3001/matchStats/updateBalls', { balls, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update balls, server is unreachable")
            })
    }, [balls])

    useEffect(() => {
        // update overs
        axios.post('http://localhost:3001/matchStats/updateOvers', { overs, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update overs, server is unreachable")
            })
    }, [overs])

    useEffect(() => {
        if (overs) {
            setTimeout(() => {
                setLoadBowler(false);
            }, 10);

            setTimeout(() => {
                setLoadBowler(true);
            }, 200);
            setIsBowlerSelected(false)
        }
    }, [overs]);

    useEffect(() => {
        if (wickets && batter1Facing) {
            setLoadBatsman1(false)
            setTimeout(() => {
                setLoadBatsman1(true);
            }, 200);
            setIsBatsman1Selected(false)
        }

        else if (wickets && batter2Facing) {
            setLoadBatsman2(false)
            setTimeout(() => {
                setLoadBatsman2(true);
            }, 200);
            setIsBatsman2Selected(false)
        }

        if (wickets) {
            setBatsmanNumber(batsmanNumber + 1)
        }
    }, [wickets])

    const updateBatsman1Selected = () => {
        setIsBatsman1Selected(true)
    }

    const updateBatsman2Selected = () => {
        setIsBatsman2Selected(true)
    }

    const updateBowledSelected = () => {
        setIsBowlerSelected(true)
    }

    return (
        <div className='innings-container'>
            <div className='inning-stats-container-inning'>
                <h2>{totalRuns}/{wickets} ({overs}.{balls})</h2>
                {(inningNoVal == 1) && (
                    <h5>TARGET: {target}</h5>
                )}
            </div>
            <div className='batsmen-innings-container-innings'>
                {loadBatsman1 && (
                    <BatsmanInnings battingTeam={battingTeam} buttonPressed={buttonPressed} currentlyFacing={batter1Facing}
                        updateCurrentlyFacing={updateBatter1Facing} batsmanSelected={updateBatsman1Selected} batsmanNumber={batsmanNumber}
                        matchStatsID={matchStatsID} inningNo={inningNo} />
                )}

                {loadBatsman2 && (
                    <BatsmanInnings battingTeam={battingTeam} buttonPressed={buttonPressed} currentlyFacing={batter2Facing}
                        updateCurrentlyFacing={updateBatter2Facing} batsmanSelected={updateBatsman2Selected} batsmanNumber={batsmanNumber + 1}
                        matchStatsID={matchStatsID} inningNo={inningNo} />
                )}
            </div>

            <div className='bowling-and-scoremachine-container'>
                {loadBowler && (
                    <BowlingInnings bowlingTeam={bowlingTeam} buttonPressed={buttonPressed} bowlerSelected={updateBowledSelected}
                        matchStatsID={matchStatsID} inningNo={inningNo} />
                )}
                {(isBatsman1Selected && isBatsman2Selected && isBowlerSelected) && (
                    <ScoreMachine onButtonPress={handleButtonPress} />
                )}
            </div>



        </div>
    )
}

export default Innings