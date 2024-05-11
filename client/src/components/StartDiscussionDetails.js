import React, { useState } from 'react';
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/StartDiscussionDetails.css'
import toast from 'react-hot-toast'
import axios from 'axios';

function StartDiscussionDetails() {
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const username = data.username

    const handleSubmit = async () => {
        // check if title field is empty
        if (!title) {
            toast.error("Title can not be empty")
        }
        else {
            let comments = []
            let upvotes = 0
            let downvotes = 0

            // insert in database
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/postDiscussion`, { title, text, comments, upvotes, downvotes, username })

                if (res)
                    toast.success("Posted Successfully")

                navigate('/home', { state: { username } })


            }
            catch (err) {
                toast.error("Couldn't reach the server")
                console.log(err);
            }
        }


    }
    return (
        <div className='start-dicussion-details-container'>
            <Navbar username={data.username} />

            <div className='main-content-start-dicussion-details'>
                <h1>Starting a discussion</h1>
                <div className='text-input'>
                    <input placeholder='Title' onChange={(e) => { setTitle(e.target.value.trim()) }}></input>
                    <textarea placeholder='Text (optional)' rows={10} onChange={(e) => { setText(e.target.value.trim()) }}></textarea>
                </div>
                <button onClick={handleSubmit}><h6>Post</h6></button>
            </div>
        </div>
    )
}

export default StartDiscussionDetails