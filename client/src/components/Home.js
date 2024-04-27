import React from 'react'
import Navbar from './Navbar'
import Discussion from './Discussion'
import StartDiscussion from './StartDiscussion'
import { useLocation } from 'react-router-dom'
import '../css/Home.css'

function Home() {
    const location = useLocation();
    const data = location.state;

    return (
        <div className='home-container'>
            <Navbar username={data.username} />

            <h1>Welcome {data.username}</h1>

            <StartDiscussion username={data.username} />
        </div>
    )
}

export default Home;