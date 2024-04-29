import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Discussion from './Discussion'
import StartDiscussion from './StartDiscussion'
import HeadingMessage from './HeadingMessage'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import '../css/Home.css'

function Home() {
    const location = useLocation();
    const data = location.state;
    const [discussions, setDiscussions] = useState();

    useEffect(() => {
        loadDiscussions();
    }, []);

    useEffect(() => {
        console.log(discussions);
    }, [discussions]);

    const loadDiscussions = async () => {
        try {
            const res = await axios.post('http://localhost:3001/getDiscussions');

            if (res) {
                setDiscussions(res.data);
            }

            else { // no discussions posted yet
                
            }
        }
        catch (err) {
            toast.error("Discussions fetch failed. Server can not be reached.")
            console.log(err)
        }
    }
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