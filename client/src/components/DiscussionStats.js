import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/DiscussionStats.css'
import upvote from '../system/assets/upvote.png'
import upvoteRed from '../system/assets/upvote-red.png'
import downvote from '../system/assets/downvote.png'
import downvoteRed from '../system/assets/downvote-red.png'
import comment from '../system/assets/comment.png'
import toast from 'react-hot-toast'
import axios from 'axios';

function DiscussionStats({ discussionId, username }) {
    const [discussion, setDiscussion] = useState()
    const [upvotes, setUpvotes] = useState()
    const [downvotes, setDownvotes] = useState()
    const [loading, setLoading] = useState(false)
    const [upvoted, setUpvoted] = useState(false)
    const [downvoted, setDownvoted] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/getDiscussion`, { discussionId })
            .then(res => {
                setDiscussion(res.data)
                setUpvotes(res.data.upvotes)
                setDownvotes(res.data.downvotes)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    const handleUpvote = (e) => {
        if (upvoted && !downvoted) {
            setUpvoted(false)
            setUpvotes(upvotes - 1)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/cancelUpvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }
        else if (downvoted && !upvoted) {
            setUpvoted(true)
            setDownvoted(false)
            setUpvotes(upvotes + 1)
            setDownvotes(downvotes - 1)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/upvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }

            // decrease downvote
            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/cancelDownvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }
        else if (!downvoted && !upvoted) {
            setUpvotes(upvotes + 1)
            setUpvoted(true)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/upvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }
    }

    const handleDownvote = (e) => {
        if (downvoted && !upvoted) {
            setDownvoted(false)
            setDownvotes(downvotes - 1)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/cancelDownvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }
        }
        else if (!downvoted && upvoted) {
            setDownvoted(true)
            setUpvoted(false)
            setDownvotes(downvotes + 1)
            setUpvotes(upvotes - 1)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/cancelUpvote`, { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/downvote`, { discussionId })

            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }
        }
        else if (!downvoted && !upvoted) {
            setDownvotes(downvotes + 1)
            setDownvoted(true)

            try {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/downvote`, { discussionId })

            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }
        }


    }

    const handleCommentClick = () => {
        navigate('/discussionComments', { state: { username, discussion } })
    }

    if (loading) {
        return null
    }
    return (
        <div className='dicussion-stats-container'>
            <div className='upvotes-downvotes-container'>
                <div className='upvotes-container-discussion-stats'>
                    <a onClick={handleUpvote}>
                        {(upvoted) && (
                            <img src={upvoteRed} className='stats-img-discussion-page'></img>
                        )}
                        {(!upvoted) && (
                            <img src={upvote} className='stats-img-discussion-page'></img>
                        )}
                    </a>
                    <p>
                        {upvotes}
                    </p>
                </div>

                <div className='downvotes-container-discussion-stats'>
                    <a onClick={handleDownvote}>
                        {(downvoted) && (
                            <img src={downvoteRed} className='stats-img-discussion-page'></img>
                        )}
                        {(!downvoted) && (
                            <img src={downvote} className='stats-img-discussion-page'></img>
                        )}
                    </a>
                    <p>{downvotes}</p>
                </div>
            </div>
            <a onClick={handleCommentClick}>
                <img src={comment} className='stats-img-discussion-page'></img>
            </a>
        </div>
    )
}

export default DiscussionStats