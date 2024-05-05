import React, { useState, useEffect } from 'react'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'

import '../css/BatsmanInnings.css'

function BatsmanInnings({ battingTeam }) {
    const [batsman, setBatsman] = useState();
    const [allPlayers, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [runsScored, setRunsScored] = useState(0)
    const [ballsFaced, setBallsFaced] = useState(0)
    const [currentlyFacing, setCurrentlyFacing] = useState()

    useEffect(() => {
        setLoading(true)

        // get the players of this team
        const teamName = battingTeam

        if (teamName) {
            axios.post('http://localhost:3001/player/getPlayersOfTeam', { teamName })
                .then(res => {
                    if (res.data && Array.isArray(res.data)) {
                        setAllPlayers(res.data)
                    }
                })
                .catch(err => {
                    toast.error("Error fetching team's players, couldn't reach the server")
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }


    }, [battingTeam])

    const bracketStyle = {
        fontFamily: 'Roboto Slab, sans-serif',
    };

    if (loading || allPlayers.length == 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <div className='batting-innings-container'>
                <FormControl variant="standard" fullWidth
                    className={`${batsman ? 'hide' : ''}`}>

                    <InputLabel id="demo-simple-select-standard-label"><h6>SELECT BATSMAN</h6></InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={batsman}
                        onChange={(e) => { setBatsman(e.target.value) }}
                        label="batsman"
                    >
                        {allPlayers.map((player, index) => (
                            <MenuItem key={index} value={player.username}>
                                <h6>{player.username}</h6>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className={`batsman-details-container-batting-innings ${batsman ? 'show' : ''}`}>
                    <h4>{batsman}</h4>
                    <div className='stats-details-batting-innings'>
                        <h4>{runsScored}</h4>
                        <h4 className = 'flex'>
                            <h4 style={bracketStyle}>(</h4>
                            {ballsFaced}
                            <h4 style={bracketStyle}>)</h4>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }

}

export default BatsmanInnings