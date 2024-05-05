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

    const handleButtonPress = (value) => {
        setButtonPressed(value);

        if (value == 'WD') {
            setTotalRuns(totalRuns + 1)
        }
        else if (value == 'OUT') {
            setWickets(wickets + 1);
            setBalls(balls + 1)
        }
        else {
            setTotalRuns(totalRuns + value)
            setBalls(balls + 1)
        }
    };

    useEffect(() => {
        if (balls > 5) {
            setBalls(0)
            setOvers(overs + 1)
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

    return (
        <div className='innings-container'>
            <div className='inning-stats-container-inning'>
                <h6>{totalRuns}/{wickets} ({overs}.{balls})</h6>
            </div>
            <div className='batsmen-innings-container-innings'>
                <BatsmanInnings battingTeam={battingTeam} />
                <BatsmanInnings battingTeam={battingTeam} />
            </div>

            <div className='bowling-and-scoremachine-container'>
                <BowlingInnings bowlingTeam={bowlingTeam} />

                <ScoreMachine onButtonPress={handleButtonPress} />
            </div>

        </div>
    )
}

export default Innings