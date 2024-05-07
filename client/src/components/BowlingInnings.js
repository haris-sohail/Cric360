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

function BowlingInnings({ bowlingTeam, buttonPressed, bowlerSelected, matchStatsID, inningNo }) {
    let useEffectCalled = false;
    const [bowler, setBowler] = useState()
    const [allPlayers, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [ballsBowled, setBallsBowled] = useState(0)
    const [oversBowled, setOversBowled] = useState(0)
    const [runsConceded, setRunsConceded] = useState(0)
    const [wickets, setWickets] = useState(0)
    const [economy, setEconomy] = useState(0)
    const [bowlerStats, setBowlerStats] = useState()

    const setBowlerStatsFunc = () => {
        setLoading(true)
        axios.post('http://localhost:3001/matchStats/getBowlerStats', { matchStatsID, inningNo, bowler })
            .then(res => {
                if (res.data) {
                    setBowlerStats(res.data)
                }
            })
            .catch(err => {
                toast.error("Error setting bowler stats, couldn't reach the server")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (bowlerStats) {
            setOversBowled(bowlerStats.overs)
            setRunsConceded(bowlerStats.runs)
            setWickets(bowlerStats.wickets)
            setEconomy(bowlerStats.economy)
        }
    }, [bowlerStats])


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

    useEffect(() => {
        if (bowler) {
            // update in database
            axios.post('http://localhost:3001/matchStats/createBowler', { matchStatsID, inningNo, bowler })
                .catch(err => {
                    toast.error("Couldn't create bowler, server is unreachable")
                    console.log(err)
                })

            setBowlerStatsFunc()
        }
    }, [bowler])

    useEffect(() => {
        if (ballsBowled) {
            // update in database
            axios.post('http://localhost:3001/matchStats/updateBallsBowled', { matchStatsID, inningNo, ballsBowled, bowler })
                .catch(err => {
                    toast.error("Couldn't update balls bowled, server is unreachable")
                    console.log(err)
                })
        }
    }, [ballsBowled])

    useEffect(() => {

        if (oversBowled) {
            // update in database
            axios.post('http://localhost:3001/matchStats/updateOversBowled', { matchStatsID, inningNo, oversBowled, bowler })
                .catch(err => {
                    toast.error("Couldn't update overs bowled, server is unreachable")
                    console.log(err)
                })
        }
    }, [oversBowled])

    useEffect(() => {
        if (runsConceded) {
            // update in database
            axios.post('http://localhost:3001/matchStats/updateRunsConceded', { matchStatsID, inningNo, runsConceded, bowler })
                .catch(err => {
                    toast.error("Couldn't update runs conceded, server is unreachable")
                    console.log(err)
                })
        }
    }, [runsConceded])

    useEffect(() => {
        if (wickets) {
            // update in database
            axios.post('http://localhost:3001/matchStats/updateWicketsBowler', { matchStatsID, inningNo, wickets, bowler })
                .catch(err => {
                    toast.error("Couldn't update wickets, server is unreachable")
                    console.log(err)
                })
        }
    }, [wickets])

    useEffect(() => {
        if (economy) {
            // update in database
            axios.post('http://localhost:3001/matchStats/updateBowlerEconomy', { matchStatsID, inningNo, economy, bowler })
                .catch(err => {
                    toast.error("Couldn't update economy, server is unreachable")
                    console.log(err)
                })
        }
    }, [economy])

    useEffect(() => {
        if (bowler) {
            bowlerSelected(true)
        }
    }, [bowler])

    useEffect(() => {
        if (buttonPressed) {
            if (buttonPressed != 'WD') {
                setBallsBowled(ballsBowled + 1)
            }

            // runs conceded
            if (buttonPressed == 'WD') {
                setRunsConceded(runsConceded + 1)
            }
            else if (buttonPressed == 'OUT') {
                setWickets(wickets + 1)
            }
            else if (buttonPressed == 'MISS') {

            }
            else {
                setRunsConceded(runsConceded + parseInt(buttonPressed))
            }
        }
    }, [buttonPressed])

    useEffect(() => {
        if (ballsBowled > 5) {
            setBallsBowled(0)

            // update economy
            setEconomy(runsConceded / (oversBowled + 1))
            
            setOversBowled(oversBowled + 1)
        }
    }, [ballsBowled])

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
            <div className='bowling-innings-container'>
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
                            {runsConceded} - {wickets} ({oversBowled}.{ballsBowled})
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default BowlingInnings