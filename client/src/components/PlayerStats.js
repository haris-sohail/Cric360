import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import '../css/PlayerStats.css'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'

function PlayerStats({ playerName, teamName }) {
    return (
        <div className='player-stats-container'>
            <h6>{playerName}</h6>
            <p><em>{teamName.toUpperCase()}</em></p>
        </div>
    )
}

export default PlayerStats