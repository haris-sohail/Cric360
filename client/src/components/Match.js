import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TossDetails from './TossDetails';
import '../css/Match.css'


function Match({ id, venue, startingAt, teamA, format, isLive, username }) {
  const [teamLogo, setTeamLogo] = useState();
  const [startingAtDate, setStartingAtDate] = useState()
  const [decreaseOpacity, setDecreaseOpacity] = useState(false)
  const [showAcceptButton, setShowAcceptButton] = useState(false)
  const [showStartMatchButton, setShowStartMatchButton] = useState(false)
  const [showViewMatchButton, setShowViewMatchButton] = useState(false)
  const [isUserUmpire, setIsUserUmpire] = useState(false)
  const [myTeam, setMyTeam] = useState()
  const [matchAccepted, setMatchAccepted] = useState(false)
  const [teamB, setTeamB] = useState()
  const [teamBLogo, setTeamBLogo] = useState()
  const [loading, setLoading] = useState(false)
  const [isMatchEnded, setIsMatchEnded] = useState(false)
  const [matchStats, setMatchStats] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    // check if the user is umpire, and set start match button if they are
    checkUser()

    // check if match is already accepted
    checkMatchAccepted()

    // get my team
    getMyTeam()

    // get team logo
    getMyTeamLogo()

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

  useEffect(() => {
    if (teamA && teamB && startingAt) {
      getMatchStats()
    }
  }, [teamA, teamB, startingAt])

  useEffect(() => {
    if (matchStats) {
      if (matchStats.winningTeam || matchStats.isDrawn == true || matchStats.isDrawn == false) {
        setIsMatchEnded(true)
      }
    }
  }, [matchStats])

  const getMatchStats = () => {
    axios.post('http://localhost:3001/matchStats/getMatchStats', { teamA, teamB, startingAt })
      .then(res => {
        setMatchStats(res.data)
      })
      .catch(err => {
        toast.error("Error fetching match stats ID, server unreachable")
      })
  }

  const checkUser = () => {
    axios.post('http://localhost:3001/user/getUser', { username })
      .then(res => {
        if (res.data) {
          if (res.data.role.toLowerCase() == 'umpire') {
            setIsUserUmpire(true);
          }
        }
      })
      .catch(err => {
        toast.error("Error checking if user is umpire. Can not reach server")
        console.log(err)
      })
  }

  const getMyTeam = () => {
    axios.post('http://localhost:3001/player/getPlayer', { username })
      .then(res => {
        if (res.data)
          setMyTeam(res.data.teamName.toLowerCase());
      })
  }

  const getMyTeamLogo = () => {
    try {
      axios.post('http://localhost:3001/team/getTeam', { team: [teamA] })
        .then(res => {
          if (res.data)
            setTeamLogo(res.data.logo)
        })
    }
    catch (err) {
      toast.error("Couldn't reach the server")
      console.log(err)
    }
  }

  const handleMouseEnter = () => {
    if (!loading && isUserUmpire && matchAccepted && !isMatchEnded) {
      setDecreaseOpacity(true)
      setShowStartMatchButton(true)
    }

    if (!loading && myTeam) {
      if (myTeam.toLowerCase() != teamA.toLowerCase() && !matchAccepted && !isMatchEnded) {
        setDecreaseOpacity(true)
        setShowAcceptButton(true)
      }
      else {
        setDecreaseOpacity(false)
        setShowAcceptButton(false)
      }
    }

    if (!loading && isMatchEnded) {
      setDecreaseOpacity(true)
      setShowViewMatchButton(true)
    }
  }

  const handleMouseLeave = () => {
    if (!loading && isUserUmpire && matchAccepted && !isMatchEnded) {
      setDecreaseOpacity(false)
      setShowStartMatchButton(false)
    }

    if (!loading && myTeam) {
      if (myTeam.toLowerCase() != teamA.toLowerCase() && !matchAccepted && !isMatchEnded) {
        setDecreaseOpacity(false)
        setShowAcceptButton(false)
      }
      else {
        setDecreaseOpacity(false)
        setShowAcceptButton(false)
      }
    }

    if (!loading && isMatchEnded) {
      setDecreaseOpacity(false)
      setShowViewMatchButton(false)
    }
  }

  const handleAcceptMatch = () => {
    setTeamB(myTeam)

    setLoading(true)

    // set team B logo
    axios.post('http://localhost:3001/team/getTeam', { team: [myTeam] })
      .then(res => {
        if (res.data)
          setTeamBLogo(res.data.logo)
      })

    setMatchAccepted(true)

    // set team B of match
    axios.post('http://localhost:3001/match/setTeamB', { details: [id, myTeam] })
      .finally(() => {
        setLoading(false)
      })
  }

  const checkMatchAccepted = () => {
    axios.post('http://localhost:3001/match/getMatch', { id })
      .then(res => {
        if (res.data)
          if (res.data.teamB) {
            setMatchAccepted(true)
          }

        // set team B and their logo
        setTeamB(res.data.teamB)

        axios.post('http://localhost:3001/team/getTeam', { team: [res.data.teamB] })
          .then(res => {
            if (res.data)
              setTeamBLogo(res.data.logo)
          })
      })
  }

  const handleStartMatch = () => {
    if (!loading) {
      navigate('/tossDetails', { state: { teamA, teamB, username, startingAt } })
    }
  }

  const handleViewMatch = () => {
    if (!loading) {

    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
        <CircularProgress />
      </Box>
    )
  }
  else {
    return (

      <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`match-container ${matchAccepted ? 'match-accepted-match-container' : ''}`}>

        <div className={`${matchAccepted ? 'teams-container-match' : ''}`}>
          <div className={`team-details-match ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-team-details-match' : ''}`}>
            <img src={'http://localhost:3001/Images/' + teamLogo} alt="team_logo"></img>
            {(isMatchEnded && (teamA.toLowerCase() == matchStats.winningTeam.toLowerCase())) && (
              <h2>{teamA.toUpperCase()}(W)</h2>
            )}
            {(isMatchEnded && !(teamA.toLowerCase() == matchStats.winningTeam.toLowerCase())) && (
              <h2>{teamA.toUpperCase()}</h2>
            )}
            {(!isMatchEnded) && (
              <h2>{teamA.toUpperCase()}</h2>
            )}
          </div>

          {teamB && (
            <div className={`team-details-match ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-team-details-match' : ''}`}>
              {(isMatchEnded && (teamB.toLowerCase() == matchStats.winningTeam.toLowerCase())) && (
                <h2>{teamB.toUpperCase()}(W)</h2>
              )}
              {(isMatchEnded && !(teamB.toLowerCase() == matchStats.winningTeam.toLowerCase())) && (
                <h2>{teamB.toUpperCase()}</h2>
              )}
              {(!isMatchEnded) && (
                <h2>{teamB.toUpperCase()}</h2>
              )}
              <img src={'http://localhost:3001/Images/' + teamBLogo} alt="team_logo"></img>
            </div>
          )}
        </div>






        {
          (showAcceptButton) && (
            <div className='accept-match-button-container'>
              <button>
                <h6 onClick={handleAcceptMatch}>Accept Match</h6>
              </button>
            </div>
          )
        }

        {
          (showStartMatchButton) && (
            <div className='start-match-button-container'>
              <button>
                <h6 onClick={handleStartMatch}>Start Match</h6>
              </button>
            </div>
          )
        }

        {
          (showViewMatchButton) && (
            <div className='view-match-button-container start-match-button-container'>
              <button>
                <h6 onClick={handleViewMatch}>View Match</h6>
              </button>
            </div>
          )
        }


        <div className={`match-details-match-container ${decreaseOpacity ? 'decrease-opacity' : ''} ${matchAccepted ? 'match-accepted-match-details-match-container' : ''}`}>
          <p>{venue.toUpperCase()}</p>
          <p>{format.toUpperCase()}</p>
          <p>{startingAtDate}</p>
        </div>
      </div >
    )
  }


}

export default Match