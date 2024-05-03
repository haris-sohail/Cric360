import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/Match.css'


function Match({ id, venue, startingAt, teamA, format, isLive, username }) {
  const [teamLogo, setTeamLogo] = useState();
  const [startingAtDate, setStartingAtDate] = useState()
  const [decreaseOpacity, setDecreaseOpacity] = useState(false)
  const [showAcceptButton, setShowAcceptButton] = useState(false)
  const [myTeam, setMyTeam] = useState()
  const [matchAccepted, setMatchAccepted] = useState(false)
  const [teamB, setTeamB] = useState()
  const [teamBLogo, setTeamBLogo] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    // get my team
    axios.post('http://localhost:3001/player/getPlayer', { username })
      .then(res => {
        setMyTeam(res.data.teamName.toLowerCase());
      })

    // get team logo
    try {
      axios.post('http://localhost:3001/match/getTeamLogo', { team: [teamA] })
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

    setStartingAtDate(formattedDate)

    setLoading(false)

  }, [])

  const handleMouseEnter = () => {
    if (myTeam.toLowerCase() != teamA.toLowerCase() && !matchAccepted) {
      setDecreaseOpacity(true)
      setShowAcceptButton(true)
    }
    else {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
  }

  const handleMouseLeave = () => {
    if (myTeam.toLowerCase() != teamA.toLowerCase() && !matchAccepted) {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
    else {
      setDecreaseOpacity(false)
      setShowAcceptButton(false)
    }
  }

  const handleAcceptMatch = () => {
    setTeamB(myTeam)

    setLoading(true)

    // set team B logo
    axios.post('http://localhost:3001/match/getTeamLogo', { team: [myTeam] })
      .then(res => {
        console.log(res.data)
        setTeamBLogo(res.data.logo)
      })
      .finally(() => {
        setLoading(false)
      })

    setMatchAccepted(true)
    console.log('setting team b as', myTeam)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (

    <div onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`match-container ${matchAccepted ? 'match-accepted-match-container' : ''}`}>

      <div className={`${matchAccepted ? 'teams-container-match' : ''}`}>
        <div className={`team-details-match ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-team-details-match' : ''}`}>
          <img src={'http://localhost:3001/Images/' + teamLogo} alt="team_logo"></img>
          <h2>{teamA.toUpperCase()}</h2>
        </div>

        {teamB && (
          <div className={`team-details-match ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-team-details-match' : ''}`}>
            <h2>{teamB.toUpperCase()}</h2>
            <img src={'http://localhost:3001/Images/' + teamBLogo} alt="team_logo"></img>
          </div>
        )}
      </div>


      {(showAcceptButton) && (
        <div className='accept-match-button-container'>
          <button>
            <h6 onClick={handleAcceptMatch}>Accept Match</h6>
          </button>
        </div>
      )}


      <div className={`match-details-match-container ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-match-details-match-container' : ''}`}>
        <p>{venue.toUpperCase()}</p>
        <p>{format.toUpperCase()}</p>
        <p>{startingAtDate}</p>
      </div>
    </div>
  )
}

export default Match