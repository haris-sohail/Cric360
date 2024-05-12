import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Team from './Team';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/Teams.css';


function Teams() {
    const location = useLocation();
    const data = location.state;
    const username = data.username;
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTeams();
    }, []);
    

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3001/team/getTeams');
            
            if (response.status !== 200) {
                throw new Error('Failed to fetch teams');
            }
            
            setTeams(response.data.Teams); // Assuming 'Teams' is the correct property containing the array of teams
        } 
        catch (error) {
            console.error('Error fetching teams:', error);
        } 
        finally {
            setLoading(false);
        }
    };
    

    const handleRegisterTeam = () => {
        navigate('/registerTeam', { state: { username } });
    };

    return (
        <div className='main-div'>
            <Navbar username={username} />
            
            <div className='button-container'>
                <button className='register-button' onClick={handleRegisterTeam}><h6>Register a team</h6></button>
            </div>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div className='object-container'>
                        {teams.map(team => (
                            <Team 
                                key={team._id} 
                                captain_username={team.captain_username}
                                name={team.name}
                                logo={team.logo}
                                location={team.location}
                                matches_played={team.matchesPlayed}
                                matches_won={team.matchesWon}
                                matches_drawn={team.matchesDrawn}
                                matches_lost={team.matchesLost}
                                battingAvg={team.battingAvg}
                                loggedinuser={username}
                            />
                        ))}
                    </div>
                )}
            </div>
    );
}

export default Teams;


