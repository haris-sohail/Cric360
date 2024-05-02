// Teams.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Team from './Team';
import '../css/Teams.css';
import defaultteam from '../system/assets/tigers.png'

function Teams() {
    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    const handleRegisterTeam = () => {
        navigate('/registerTeam', { state: { username } });
    };

    return (
        <div className='main-div'>
        <Navbar username={username} />
        <div className='button-container'>
        <button className='register-button' onClick={handleRegisterTeam}><h6>Register a team</h6></button>
        </div>
        <div className='teams-container'>
            <div className='object-container'>
                <Team 
                    captain_username={"Nigga"}
                    name={"Niggas"}
                    logo={defaultteam}
                    location={"faislabad"}
                    matches_played={10}
                    matches_won={5}
                    matches_drawn={2}
                    matches_lost={3}
                    battingAvg={10}
                />
               
            </div>
        </div>
        </div>
    );
}

export default Teams;
