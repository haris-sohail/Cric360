import React, { useState } from 'react'
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

function CreateMatch() {
    const location = useLocation();
    const data = location.state;
    const username = data.username
    const navigate = useNavigate();
    const [startingAt, setStartinAt] = useState()
    const [venue, setVenue] = useState()
    const [format, setFormat] = useState()

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
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <div id='create-button-container-create-match'>
                    <button><h6>Create</h6></button>
                </div>
            </div>
        </div>
    )
}

export default CreateMatch