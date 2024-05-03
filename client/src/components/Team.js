import React from 'react';

function Team({ captain_username, name,logo, location, matches_played, matches_won, matches_drawn, matches_lost, battingAvg }) {
  return (
    <div className='teams-container'>
      <div className='title-container-teamspage'>
        <h2>{name}</h2>
        <h3>{location}</h3>
      </div>

      <div className='image-container'>
          <img src={logo}></img>
      </div>
    </div>
  );
}

export default Team;
