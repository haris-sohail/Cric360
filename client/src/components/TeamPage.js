import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [showbutton, setshowbutton] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    hidejointeambutton();
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

  const hidejointeambutton = () => {
    axios.post('http://localhost:3001/user/getUser', { username })
      .then(res => {
        if (res.data.role == "player" || res.data.role != "umpire") {

          axios.post('http://localhost:3001/player/getPlayer', { username })
            .then(res => {
              if (res.data.teamName == "") {
                // hide the create match button
                setshowbutton(true);

              }
              else {
                setshowbutton(false);
              }
            })

        }
        else {
          setshowbutton(false);
        }
      })




  }


  const handlejointeam = () => {
    setLoading(true);
    axios.post('http://localhost:3001/player/joinTeam', { username: data.loggedinuser, teamName: data.name })
      .then(() => {
        toast.success("Successfully joined the team");
        navigate('/home', { state: { username } })
      })
      .catch(err => {
        console.error(err);
        toast.error("Error joining the team, please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePlayerClick = (e) => {
    const playerName = e.currentTarget.querySelector('.player-name').textContent;
    const playerDetails = allPlayers.find(player => player.username === playerName);
    navigate('/playerStatsDetails', { state: { username, playerDetails } });
  }

  return (
    <div className='Main-div'>
      <Navbar username={data.loggedinuser} />
      {showbutton && (
        <div className='join-team-button'>
          <button className='join-button' onClick={handlejointeam}><h6>Join Team</h6></button>
        </div>
      )}

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
          <div key={player._id} className='team-player-info' onClick={handlePlayerClick}>
            <div className='image-container-players'>
              <img src={'http://localhost:3001/Images/default-team.png'}></img>
            </div>
            <div className="player-name">
              {player.username}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TeamPage;
