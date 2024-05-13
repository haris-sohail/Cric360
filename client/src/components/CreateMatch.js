import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/CreateMatch.css'
import Navbar from './Navbar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HeadingMessage from './HeadingMessage';
import toast from 'react-hot-toast'
import axios from 'axios'
import dayjs from 'dayjs';

function CreateMatch() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();
    const [startingAt, setStartingAt] = useState()
    const [venue, setVenue] = useState()
    const [format, setFormat] = useState()
    const [teamName, setTeamName] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // get the team name of the player
        setLoading(true)
        axios.post('http://localhost:3001/player/getPlayer', { username })
            .then(res => {
                setTeamName(res.data.teamName);
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const handleCreate = async () => {
        // check if all fields are filled
        if (!startingAt || !venue || !format) {
            toast.error("Please fill in all the fields")
        }
        else {
            // create the match
            if (teamName) {
                try {
                    axios.post('http://localhost:3001/match/createMatch', { startingAt, venue, format, teamName })
                        .then(res => {
                            toast.success("Created the match successfully")
                            navigate('/matches', { state: { username } })
                        })
                }
                catch (err) {
                    toast.error("Couldn't reach the server")
                    console.log(err)
                }
            }
            else {
                toast.error("Team name not found")
            }

        }

    }
    if (loading) {
        return null;
    }
    return (
        <div className='create-match-container'>
            <Navbar username={username} />

            <div className='match-input-create-match'>
                <HeadingMessage message={"Creating Match"} id='heading-message-create-match' />

                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label"><h6>FORMAT</h6></InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={format}
                        onChange={(e) => { setFormat(e.target.value) }}
                        label="format"
                    >
                        <MenuItem value={"odi"}><h6>ODI</h6></MenuItem>
                        <MenuItem value={"t20"}><h6>T20</h6></MenuItem>
                        <MenuItem value={"test"}><h6>TEST</h6></MenuItem>
                    </Select>
                </FormControl>

                <input placeholder='VENUE' onChange={(e) => { setVenue(e.target.value.trim()) }} id='venue-in-create-match'></input>


                <LocalizationProvider dateAdapter={AdapterDayjs} className='date-time-container-create-match'>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="Starting at"
                            onChange={(e) => setStartingAt(e)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <div id='create-button-container-create-match'>
                    <button onClick={handleCreate}><h6>Create</h6></button>
                </div>
            </div>

        </div>
    )
}

export default CreateMatch