import React, { useEffect, useState } from 'react'
import '../css/Innings.css'
import BatsmanInnings from './BatsmanInnings'
import BowlingInnings from './BowlingInnings'
import ScoreMachine from './ScoreMachine'
import axios from 'axios'
import toast from 'react-hot-toast'

function Innings({ matchStatsID, battingTeam, bowlingTeam, inningNoVal }) {
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
        if (balls > 5) {
            setBalls(0)
            setOvers(overs + 1)

            const tempFacing = batter1Facing;
            setBatter1Facing(batter2Facing);
            setBatter2Facing(tempFacing);
        }
    }, [balls])

    useEffect(() => {
        axios.post('http://localhost:3001/matchStats/updateTotalRuns', { totalRuns, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update total runs, server is unreachable")
            })
    }, [totalRuns])

    useEffect(() => {
        axios.post('http://localhost:3001/matchStats/updateWickets', { wickets, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update wickets, server is unreachable")
            })
    }, [wickets])

    useEffect(() => {
        axios.post('http://localhost:3001/matchStats/updateBalls', { balls, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update balls, server is unreachable")
            })
    }, [balls])

    useEffect(() => {
        axios.post('http://localhost:3001/matchStats/updateOvers', { overs, matchStatsID, inningNo })
            .catch(err => {
                console.log(err)
                toast.error("Couldn't update overs, server is unreachable")
            })
    }, [overs])

    useEffect(() => {
        if (overs) {
            setLoadBowler(false);
            setTimeout(() => {
                setLoadBowler(true);
            }, 200);
        }
    }, [overs]);

    useEffect(() => {
        if (wickets && batter1Facing) {
            setLoadBatsman1(false)
            setTimeout(() => {
                setLoadBatsman1(true);
            }, 200);
        }

        else if (wickets && batter2Facing) {
            setLoadBatsman2(false)
            setTimeout(() => {
                setLoadBatsman2(true);
            }, 200);
        }
    }, [wickets])
    return (
        <div className='innings-container'>
            <div className='inning-stats-container-inning'>
                <h2>{totalRuns}/{wickets} ({overs}.{balls})</h2>
            </div>
            <div className='batsmen-innings-container-innings'>
                {loadBatsman1 && (
                    <BatsmanInnings battingTeam={battingTeam} buttonPressed={buttonPressed} currentlyFacing={batter1Facing}
                        updateCurrentlyFacing={updateBatter1Facing} />
                )}

                {loadBatsman2 && (
                    <BatsmanInnings battingTeam={battingTeam} buttonPressed={buttonPressed} currentlyFacing={batter2Facing}
                        updateCurrentlyFacing={updateBatter2Facing} />
                )}
            </div>

            <div className='bowling-and-scoremachine-container'>
                {loadBowler && (
                    <BowlingInnings bowlingTeam={bowlingTeam} buttonPressed={buttonPressed} />
                )}
                <ScoreMachine onButtonPress={handleButtonPress} />
            </div>

        </div>
    )
}

export default Innings