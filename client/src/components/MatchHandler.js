import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/MatchHandler.css'

function MatchHandler() {
    const location = useLocation()
    const data = location.state
    const tossWonBy = data.tossWonBy
    const electedTo = data.electedTo

    return (
        <div className='match-handler-container'>
            <div className='match-handler-live-container'>
                <h6>LIVE</h6>
                <div className='blink-dot-live-container'></div>
            </div>
        </div>
    )
}

export default MatchHandler