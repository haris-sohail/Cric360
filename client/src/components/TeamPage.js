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
  const data = location.state;
  const [loading, setLoading] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  let useEffectCalled = false;
  const username = data.loggedinuser;


  useEffect(() => {
     console.log(data);
  }, [data]);

  useEffect(() => {
    useEffectCalled = true;
    setLoading(true);
    if (useEffectCalled) {
      const teamName = data.name;
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

  const handlejointeam = () => {
    setLoading(true);
    axios.post('http://localhost:3001/player/joinTeam', { username: data.loggedinuser, teamName: data.name })
      .then(() => {
        toast.success("Successfully joined the team");
      })
      .catch(err => {
        console.error(err);
        toast.error("Error joining the team, please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='Main-div'>
      <Navbar />
      <div className='join-team-button'>
        <button className='join-button' onClick={handlejointeam}><h6>Join Team</h6></button>
      </div>

      <div className='first-slot'>
        <div className='image-container'>
          <img src={'http://localhost:3001/Images/' + data.logo} alt="Team Logo" />
        </div>

        <div className='headings-one'>
          <h2>{data.name.toUpperCase()}</h2>
          <p>{data.location}</p>
        </div>

      </div>

      {data && (
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
              <p>{data.captain_username}</p>
              <p>{data.matches_played}</p>
              <p>{data.matches_won}</p>
              <p>{data.matches_lost}</p>
              <p>{data.matches_drawn}</p>
              <p>{data.battingAvg}</p>
            </div>
          </div>
        </div>
      )}

      <div className='team-players-container'>
      <div className='stats-heading'>
            <h2>PLAYERS</h2>
        </div>

            {allPlayers.map(player => (
             <div className='team-player-info'>
                <div className='image-container-players'>
                    <img src={'http://localhost:3001/Images/default-team.png'}></img>
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
