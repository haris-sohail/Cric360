import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function Team({ captain_username, name,logo, location, matches_played, matches_won, matches_drawn, matches_lost, battingAvg, loggedinuser }) {
  const navigate = useNavigate();

  const handleTeamClick=(e)=>{
    navigate('/teampage', {state: {captain_username,name,logo,location,matches_played,matches_won,matches_lost,matches_drawn,battingAvg,loggedinuser}})
  }

  return (
    <a onClick={handleTeamClick} id='anchor-team-click'>
    <div className='teams-container'>
      <div className='title-container-teamspage'>
        <h2>{name.toUpperCase()}</h2>
        <h3>{location}</h3>
      </div>

      <div className='image-container'>
          <img src={'http://localhost:3001/Images/' + logo}></img>
      </div>
    </div>
    </a>
  );
}

export default Team;
