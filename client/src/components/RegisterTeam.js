import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';
import defaultTeamImage from '../system/assets/default-team.png'
import '../css/RegisterTeam.css'

function RegisterTeam() {
    const [teamName, setTeamName] = useState();
    const [teamLogo, setLogo] = useState();
    const [teamLocation, setLocation] = useState();

    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    const handleSubmit = async () => {

        if (!teamName || !teamLocation) {
            toast.error("Please fill all the fields")
            return;
        }

        if (!teamLogo) { // upload a default team logo
            setLogo(defaultTeamImage);
        }
        try {
            const res = await axios.post('http://localhost:3001/registerTeam', { teamName, teamLocation, teamLogo });

            if (res) {
                toast.success("Registered successfully")
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Can not reach the server")
        }
    }

    return (
        <div className='register-team-container'>
            <h1>Registering a Team</h1>

            <div className='register-team-input'>
                <input placeholder='Team Name' onChange={(e) => { setTeamName(e.target.value.trim()) }}></input>
                <input placeholder='State / Town' onChange={(e) => { setLocation(e.target.value.trim()) }}></input>

                <input id='image-upload-register-team'
                    type="file"
                    onChange={(e) => setLogo(e.target.files[0])}
                />
            </div>
            <button onClick={handleSubmit}><h6>Register</h6></button>
        </div>
    )
}

export default RegisterTeam