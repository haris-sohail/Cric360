import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import toast from 'react-hot-toast';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/TeamPage.css';

function TeamPage() {
  const location = useLocation();
  const { state } = location;
  const [loading, setLoading] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  let useEffectCalled = false;

  useEffect(() => {
    // console.log(state);
  }, [state]);

  useEffect(() => {
    useEffectCalled = true;
    setLoading(true);
    if (useEffectCalled) {
      const teamName = state.name;
      axios.post('http://localhost:3001/player/getPlayersOfTeam', { teamName })
        .then(res => {
          setAllPlayers(res.data);
        })
        .catch(err => {
          console.log(err);
          toast.error("Error getting all players, couldn't reach server");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading || !allPlayers) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className='Main-div'>
      <Navbar />
      <div className='first-slot'>
        <div className='image-container'>
          <img src={'http://localhost:3001/Images/' + state.logo} alt="Team Logo" />
        </div>

        <div className='headings-one'>
          <h2>{state.name}</h2>
          <p>{state.location}</p>
        </div>

      </div>

      {state && (
        <div className='stats-container'>
          <div className='stats-heading'>
            <h2>STATS</h2>
          </div>
          <div className='total-container'>
            <div className='headings-container'>
              <p>Captain </p>
              <p>matches played </p>
              <p>matches won </p>
              <p>matches lost </p>
              <p>matches drawn </p>
              <p>batting avg </p>
            </div>
            <div className='values-container'>
              <p>{state.captain_username}</p>
              <p>{state.matches_played}</p>
              <p>{state.matches_won}</p>
              <p>{state.matches_lost}</p>
              <p>{state.matches_drawn}</p>
              <p>{state.battingAvg}</p>
            </div>
          </div>
        </div>
      )}

      <div className='team-players-container'>
       
            {allPlayers.map(player => (
             <div className='team-player-info'>
                <div className='image-container-players'>
                    <img src={'http://localhost:3001/Images/' + state.logo}></img>
                </div>
            <div key={player._id} className="player-name">
                {player.username}
            </div>
            </div>
            ))}
        
      </div>
    </div>
  );
}

export default TeamPage;
