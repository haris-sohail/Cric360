import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../css/Match.css'


function Match({ id, venue, startingAt, teamA, format, isLive, username }) {
  const [teamLogo, setTeamLogo] = useState();
  const [startingAtDate, setStartingAtDate] = useState()
  const [decreaseOpacity, setDecreaseOpacity] = useState(false)
  const [showAcceptButton, setShowAcceptButton] = useState(false)
  const [myTeam, setMyTeam] = useState()

  useEffect(() => {
    // get my team
    axios.post('http://localhost:3001/player/getTeam', { username })
      .then(res => {
        if (res.data.teamName.toLowerCase() == teamA.toLowerCase()) {
          setMyTeam(true);
        }
        else {
          setMyTeam(false);
        }
      })

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

  const handleMouseEnter = () => {
    if (!myTeam) {
      setDecreaseOpacity(true)
      setShowAcceptButton(true)
    }
    else {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
  }

  const handleMouseLeave = () => {
    if (!myTeam) {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
    else {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
  }

  return (
    <div onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`match-container`}>

      <div className={`team-details-match ${decreaseOpacity ? 'decrease-opacity' : ''}`}>
        <img src={'http://localhost:3001/Images/' + teamLogo} alt="team_logo"></img>
        <h2>{teamA.toUpperCase()}</h2>
      </div>

      {(showAcceptButton) && (
        <div className='accept-match-button-container'>
          <button>
            <h6>Accept Match</h6>
          </button>
        </div>
      )}


      <div className={`match-details-match-container ${decreaseOpacity ? 'decrease-opacity' : ''}`}>
        <p>{venue.toUpperCase()}</p>
        <p>{format.toUpperCase()}</p>
        <p>{startingAtDate}</p>
      </div>
    </div>
  )
}

export default Match