import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import '../css/PlayerStatsPage.css'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'
import PlayerStats from './PlayerStats'

function PlayerStatsPage() {
    const location = useLocation()
    const data = location.state
    const username = data.username
    const [players, setPlayers] = useState()
    const [playersComponents, setPlayersComponents] = useState()
    const [loading, setLoading] = useState(false)
    let useEffectCalled = false

    useEffect(() => {
        if (!useEffectCalled) {
            useEffectCalled = true

            setLoading(true)

            // get all players
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/getAllPlayers`)
                .then(res => {
                    if (res.data) {
                        setPlayers(res.data)
                    }
                })
                .catch(err => {
                    toast.error("Error fetching all players, server is unreachable")
                })

                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    useEffect(() => {
        if (players) {
            const playersComp = players.map(player => (
                <PlayerStats
                    key={player._id}
                    username={username}
                    playerDetails={player}
                />
            ))

            setPlayersComponents(playersComp)
        }
    }, [players])

    if (loading || !players) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                <CircularProgress />
            </Box>
        )
    }

    else {
        return (
            <div className='player-stats-page-container'>
                <Navbar username={username} />

                <div className='main-content-container-player-stats-page-container'>
                    {playersComponents}
                </div>

            </div>
        )
    }

}

export default PlayerStatsPage