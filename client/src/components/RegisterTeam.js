import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import defaultTeam from '../system/assets/default-team.png'
import toast from 'react-hot-toast'
import axios from 'axios';
import '../css/RegisterTeam.css'

function RegisterTeam() {
    const [teamName, setTeamName] = useState();
    const [teamLogo, setLogo] = useState();
    const [teamLocation, setLocation] = useState();

    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    const formData = new FormData();
    formData.append('teamName', teamName);
    formData.append('teamLocation', teamLocation);
    formData.append('teamLogo', teamLogo);
    formData.append('captainUsername', username)

    const handleSubmit = async () => {

        if (!teamName || !teamLocation) {
            toast.error("Please fill all the fields")
            return;
        }

        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/team/registerTeam`, formData)
                .then(() => {
                    // change team name of player
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/player/changeTeamName`, { username, teamName })
                        .then(() => {
                            // change captain status
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeCaptain`, { username })
                                .then(() => {
                                    toast.success("Registered Successfully")
                                    navigate('/teams', { state: { username } })
                                })
                        })
                })
        }
        catch (err) {
            console.log(err)
            toast.error("Can not reach the server")
        }
    }

    return (
        <div className='register-team-container'>
            <Navbar username={data.username} />


            <div className='main-content-register-team'>
                <h1>Registering a Team</h1>
                <div className='register-team-input'>
                    <input placeholder='Team Name' onChange={(e) => { setTeamName(e.target.value.trim().toLocaleLowerCase()) }}></input>
                    <input placeholder='State / Town' onChange={(e) => { setLocation(e.target.value.trim()) }}></input>

                    <input id='image-upload-register-team'
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                </div>
                <button onClick={handleSubmit}><h6>Register</h6></button>
            </div>
        </div>
    )
}

export default RegisterTeam