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

function BatsmanInnings({ battingTeam, buttonPressed, currentlyFacing, updateCurrentlyFacing, batsmanSelected, batsmanNumber, matchStatsID
    , inningNo
}) {
    const [batsman, setBatsman] = useState();
    const [allPlayers, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [runsScored, setRunsScored] = useState(0)
    const [ballsFaced, setBallsFaced] = useState(0)
    let useEffectCalled = false;

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true
        }
    }, [])

    useEffect(() => {
        // update in database
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/matchStats/updateRunsScoredBatsman`, { matchStatsID, batsmanNumber, inningNo, runsScored })
            .catch(err => {
                toast.error("Couldn't update runs, server is unreachable")
                console.log(err)
            })
    }, [runsScored])

    useEffect(() => {
        if (batsman) {
            // update in database
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/matchStats/updateBatsmanName`, { matchStatsID, batsmanNumber, inningNo, batsman })
                .catch(err => {
                    toast.error("Couldn't update batsman name, server is unreachable")
                    console.log(err)
                })

            // increment no of matches
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/incrementNoMatches`, { username: batsman })
                .catch(err => {
                    toast.error("Couldn't update number of matches for player, server is unreachable")
                    console.log(err)
                })
        }
    }, [batsman])

    useEffect(() => {
        // update in database
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/matchStats/updateBallsFaced`, { matchStatsID, batsmanNumber, inningNo, ballsFaced })
            .catch(err => {
                toast.error("Couldn't update balls faced, server is unreachable")
                console.log(err)
            })

        // update individual stats
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/updateBallsFacedPlayer`, { batsman, ballsFaced })
            .catch(err => {
                toast.error("Couldn't update balls faced for player, server is unreachable")
                console.log(err)
            })
    }, [ballsFaced])

    useEffect(() => {
        if (buttonPressed != '' && buttonPressed) {
            if (buttonPressed != 'OUT' || buttonPressed != 'MISS' || buttonPressed != 'WD') {

            }
        }

    }, [buttonPressed, ballsFaced])

    useEffect(() => {
        if (batsman) {
            batsmanSelected(true)
        }
    }, [batsman])

    useEffect(() => {
        setLoading(true)

        // get the players of this team
        const teamName = battingTeam

        if (teamName) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/getPlayersOfTeam`, { teamName })
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

    useEffect(() => {
        if (buttonPressed && currentlyFacing) {
            if (buttonPressed == 'OUT') {
                setBallsFaced(ballsFaced + 1)
            }
            else if (buttonPressed == 'WD') {
            }
            else if (buttonPressed == 'MISS') {
                setBallsFaced(ballsFaced + 1)

                const ballsFacedVal = ballsFaced + 1

                // update individual stats
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/updateBattingAvgAndSRPlayer`, { batsman, buttonPressed, ballsFacedVal })
                    .catch(err => {
                        toast.error("Couldn't update batting avg of player, server is unreachable")
                        console.log(err)
                    })
            }
            else {
                setRunsScored(runsScored + buttonPressed)
                setBallsFaced(ballsFaced + 1)

                // update individual runs
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/updateRunsScored`, { username: batsman, buttonPressed })
                    .catch(err => {
                        toast.error("Couldn't update runs for player, server is unreachable")
                        console.log(err)
                    })

                const ballsFacedVal = ballsFaced + 1
                // update individual stats
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/updateBattingAvgAndSRPlayer`, { batsman, buttonPressed, ballsFacedVal })
                    .catch(err => {
                        toast.error("Couldn't update batting avg of player, server is unreachable")
                        console.log(err)
                    })
            }

            // currently facing logic
            if (buttonPressed == 1 || buttonPressed == 3 || buttonPressed == 5) {
                updateCurrentlyFacing(false)
            }
        }
    }, [buttonPressed])

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
            <div className='batsman-innings-container'>
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

                <div className={`batsman-details-container-batsman-innings ${batsman ? 'show' : ''}`}>
                    {(currentlyFacing && (
                        <h4>*{batsman}</h4>
                    ))}
                    {(!currentlyFacing && (
                        <h4>{batsman}</h4>
                    ))}
                    <div className='stats-details-batsman-innings'>
                        <h4>{runsScored}</h4>
                        <h4 className='flex'>
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