import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../css/Match.css'


function Match({ id, venue, startingAt, teamA, format, isLive }) {
  const [teamLogo, setTeamLogo] = useState();
  const [startingAtDate, setStartingAtDate] = useState()
  useEffect(() => {
    // get team logo
    try {
      axios.post('http://localhost:3001/match/getTeamLogo', { teamA })
        .then(res => {
          setTeamLogo(res.data.logo)
        })
    }
    catch (err) {
      toast.error("Couldn't reach the server")
      console.log(err)
    }

    // convert the date
    const formattedDate = new Date(startingAt).toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  
    setStartingAtDate(formattedDate);
  }, [])
  return (
    <div className='match-container'>
      <div className='team-details-match'>
        <img src={'http://localhost:3001/Images/' + teamLogo} alt="team_logo"></img>
        <h2>{ teamA.toUpperCase() }</h2>
      </div>
      <div className='match-details-match-container'>
        <p>{venue.toUpperCase()}</p>
        <p>{format.toUpperCase()}</p>
        <p>{startingAtDate}</p>
      </div>
    </div>
  )
}

export default Match