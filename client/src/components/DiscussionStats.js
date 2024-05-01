import React from 'react'
import { useEffect, useState } from 'react'
import '../css/DiscussionStats.css'
import upvote from '../system/assets/upvote.png'
import downvote from '../system/assets/downvote.png'
import comment from '../system/assets/comment.png'
import toast from 'react-hot-toast'
import axios from 'axios';

function DiscussionStats({ discussionId }) {
    const [upvotes, setUpvotes] = useState()
    const [downvotes, setDownvotes] = useState()

    useEffect(() => {

        axios.post("http://localhost:3001/getUpvotes", { discussionId })
            .then(res => {
                setUpvotes(res.data)
            })

        axios.post("http://localhost:3001/getDownvotes", { discussionId })
            .then(res => {
                setDownvotes(res.data)
            })

    }, [])

    const handleUpvote = (e) => {
        setUpvotes(upvotes + 1)

        try {
            axios.post("http://localhost:3001/upvote", { discussionId })
        }
        catch (err) {
            toast.error("Couldn't reach the server")
        }
    }

    const handleDownvote = (e) => {
        setDownvotes(downvotes + 1)

        try {
            axios.post("http://localhost:3001/downvote", { discussionId })

        }
        catch (err) {
            toast.error("Couldn't reach the server")
        }
    }

    return (
        <div className='dicussion-stats-container'>
            <div className='upvotes-downvotes-container'>
                <div className='upvotes-container'>
                    <a onClick={handleUpvote}>
                        <img src={upvote} className='stats-img-discussion-page'></img>
                    </a>
                    <p>
                        {upvotes}
                    </p>
                </div>

                <div className='downvotes-container'>
                    <a onClick={handleDownvote}>
                        <img src={downvote} className='stats-img-discussion-page'></img>
                    </a>
                    <p>{downvotes}</p>
                </div>
            </div>
            <a>
                <img src={comment} className='stats-img-discussion-page'></img>
            </a>
        </div>
    )
}

export default DiscussionStats