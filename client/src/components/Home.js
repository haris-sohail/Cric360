import React from 'react'
import Navbar from './Navbar'
import Discussion from './Discussion'
import { useLocation } from 'react-router-dom'
import '../css/Home.css'

function Home() {
    const location = useLocation();
    const data = location.state;

    return (
        <div className='home-container'>
            <Navbar />

            <h1>Welcome {data.username}</h1>

            
        </div>
    )
}

export default Home;