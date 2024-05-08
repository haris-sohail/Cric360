import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/TeamPage.css';

function TeamPage() {
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className='Main-div'>
      <Navbar />
      <div className='first-slot'>
      <div className='image-container'>
            <img src={'http://localhost:3001/Images/' + state.logo}></img>
        </div>

        <div className='headings-one'>
            <h2>{state.name}</h2>
            <p>{state.location}</p>
        </div>
        
      </div>

      {state && (
        <div className='stats-container'>       {/*split this into headings and content*/}
        <div className='stats-heading'>
            <h2>STATS</h2>
        </div>
        <div className='total-container'>
            <div className='headings-container'>
                <p>Captain </p>
                <p>matches played </p>
                <p>matches won </p>
                <p>matches Lost </p>
                <p>matches drawn </p>
                <p>batting avg </p>

            </div>
            <div className='values-container'>
                <p> {state.captain_username}</p>
                <p> {state.matches_played}</p>
                <p>{state.matches_won}</p>
                <p> {state.matches_lost}</p>
                <p>{state.matches_drawn}</p>
                <p>{state.battingAvg}</p>
            </div>
        </div>
    </div>
    
      )}
    <div className='team-player-info'>
        <h2>Players</h2>
    </div>
    </div>
  );
}

export default TeamPage;
