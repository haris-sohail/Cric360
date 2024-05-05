import React, { useState, useEffect } from 'react'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'
import '../css/BowlingInnings.css'

function BowlingInnings({ bowlingTeam }) {
    let useEffectCalled = false;
    const [bowler, setBowler] = useState()
    const [allPlayers, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [ballsBowled, setBallsBowled] = useState(0)

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true;

            setLoading(true)

            // get the players of this team
            const teamName = bowlingTeam

            if (teamName) {
                axios.post('http://localhost:3001/player/getPlayersOfTeam', { teamName })
                    .then(res => {
                        if (res.data && Array.isArray(res.data)) {
                            setAllPlayers(res.data)
                            console.log(res.data)
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
        }
    }, [])

    const bracketStyle = {
        fontFamily: 'Roboto Slab, sans-serif',
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <div className='bowling-innings-'>
                <FormControl variant="standard" fullWidth
                    className={`${bowler ? 'hide' : ''}`}>

                    <InputLabel id="demo-simple-select-standard-label"><h6>SELECT BOWLER</h6></InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={bowler}
                        onChange={(e) => { setBowler(e.target.value) }}
                        label="bowler"
                    >
                        {allPlayers.map((player, index) => (
                            <MenuItem key={index} value={player.username}>
                                <h6>{player.username}</h6>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className={`bowler-details-container-bowler-innings ${bowler ? 'show' : ''}`}>
                    <h4>{bowler}</h4>
                    <div className={`stats-details-bowler-innings`}>
                        <h4 className={`${bowler ? 'show' : ''}`}>
                            BALLS: {ballsBowled}
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default BowlingInnings