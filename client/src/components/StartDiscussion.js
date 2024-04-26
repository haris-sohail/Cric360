import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/StartDiscussion.css'

function StartDiscussion({ username }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/StartDiscussionDetails', { state: { username } })
    }
    return (
        <div >
            <a onClick={handleClick}><input type='text' placeholder='What do you want to talk about?' id='startDiscussionIn'></input></a>
        </div>
    )
}

export default StartDiscussion