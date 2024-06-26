import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Discussion from './Discussion'
import StartDiscussion from './StartDiscussion'
import HeadingMessage from './HeadingMessage'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import logoutImg from '../system/assets/logout.png'
import '../css/Home.css'

function Home() {
    const location = useLocation();
    const data = location.state;
    const [discussions, setDiscussions] = useState();
    const [discussionsComp, setDiscussionsComp] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // load all discussions
        setLoading(true);
        loadDiscussions();
    }, []);

    const updateDelDiscussion = (discussionID) => {
        // remove the discussion from the list
        const newDiscussions = discussions.filter(discussion => discussion.id !== discussionID);
        setDiscussions(newDiscussions);
    }

    useEffect(() => {
        // create discussion components
        if (discussions) {
            const discussionsComponents = discussions.map(discussion => (
                <Discussion
                    key={discussion.id}
                    id={discussion.id}
                    title={discussion.title}
                    text={discussion.text}
                    upvotes={discussion.upvotes}
                    downvotes={discussion.downvotes}
                    postedBy={discussion.username}
                    username={data.username}
                    comments={discussion.comments}
                    updateDeleteDiscussion={updateDelDiscussion}
                />
            ));
            setDiscussionsComp(discussionsComponents);
        }
    }, [discussions]);



    const loadDiscussions = async () => {
        // fetch all discussions
        try {
            const res = await axios.post('http://localhost:3001/discussion/getDiscussions')
                .finally(() => {
                    setLoading(false);
                });

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
    const handleLogout = (e) => {
        navigate('/login')
    }
    
    if (loading) {
        return null
    }

    return (
        <div className='home-container'>
            <Navbar username={data.username} />

            <div className='welcome-container-home'>
                <h1>Welcome {data.username}</h1>

                <img src={logoutImg} alt='logout' id='logout-img-home' onClick={handleLogout}></img>
            </div>

            <StartDiscussion username={data.username} />

            <div className='home-discussions-container'>

                {discussionsComp ? discussionsComp :
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                        <CircularProgress />
                    </Box>
                }

            </div>

        </div>
    )
}

export default Home;