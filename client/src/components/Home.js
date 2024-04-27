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

            <Discussion id={1} title={'Pak Lost to a C Team!'} upvotes={20} downvotes={15} username={'mushtaq'} comments={[
                {
                    username: 'ahmed',
                    text: 'Achi discussion hai'
                },
                {
                    username: 'tallal',
                    text: 'Maza nai aaya'
                }
            ]} />
        </div>
    )
}

export default Home;