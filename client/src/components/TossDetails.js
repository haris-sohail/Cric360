import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast'

import '../css/TossDetails.css'
import Navbar from './Navbar'
import MatchHandler from './MatchHandler';

function TossDetails() {
    const location = useLocation()
    const data = location.state
    const teamA = data.teamA
    const teamB = data.teamB
    const [tossWonBy, setTossWonBy] = useState()
    const [tossLostBy, setTossLostBy] = useState()
    const [electedTo, setElectedTo] = useState()
    const navigate = useNavigate()

    const handleStartInnings = () => {
        if (!tossWonBy || !electedTo) {
            toast.error("Please fill in all the fields")
        }
        else {
            navigate('/matchHandler', { state: { tossWonBy, electedTo, tossLostBy } })
        }
    }

    const handleTossWinner = (e) => {
        let tossWinner = e.target.value

        setTossWonBy(e.target.value)

        if (tossWinner.toLowerCase() == teamA.toLowerCase()) {
            setTossLostBy(teamB)
        }
        else {
            setTossLostBy(teamA)
        }
    }

    return (
        <div className='toss-details-container'>
            <Navbar username={data.username} />

            <div className='main-content-container-toss-details'>

                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label"><h6>TOSS WON BY</h6></InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={tossWonBy}
                        onChange={handleTossWinner}
                        label="toss-won-by"
                    >
                        <MenuItem value={teamA}><h6>{teamA.toUpperCase()}</h6></MenuItem>
                        <MenuItem value={teamB}><h6>{teamB.toUpperCase()}</h6></MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label"><h6>ELECTED TO</h6></InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={electedTo}
                        onChange={(e) => { setElectedTo(e.target.value) }}
                        label="elected-to"
                    >
                        <MenuItem value={"bat"}><h6>BAT</h6></MenuItem>
                        <MenuItem value={"bowl"}><h6>BOWL</h6></MenuItem>
                    </Select>
                </FormControl>

                <div className='start-innings-btn-container-toss-details'>
                    <button onClick={handleStartInnings}><h6>START INNINGS</h6></button>
                </div>
            </div>
        </div>
    )
}

export default TossDetails