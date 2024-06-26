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
        // get the discussion
        setLoading(true)
        axios.post("http://localhost:3001/discussion/getDiscussion", { discussionId })
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
        // if the user has already upvoted, cancel the upvote
        if (upvoted && !downvoted) {
            setUpvoted(false)
            setUpvotes(upvotes - 1)

            try {
                axios.post("http://localhost:3001/discussion/cancelUpvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }

        //  if the user has already downvoted, cancel the downvote and upvote
        else if (downvoted && !upvoted) {
            setUpvoted(true)
            setDownvoted(false)
            setUpvotes(upvotes + 1)
            setDownvotes(downvotes - 1)

            try {
                axios.post("http://localhost:3001/discussion/upvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }

            // decrease downvote
            try {
                axios.post("http://localhost:3001/discussion/cancelDownvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }
        // if the user hasn't upvoted or downvoted, upvote
        else if (!downvoted && !upvoted) {
            setUpvotes(upvotes + 1)
            setUpvoted(true)

            try {
                axios.post("http://localhost:3001/discussion/upvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, upvote failed")
            }
        }
    }

    const handleDownvote = (e) => {
        // if the user has already downvoted, cancel the downvote
        if (downvoted && !upvoted) {
            setDownvoted(false)
            setDownvotes(downvotes - 1)

            try {
                axios.post("http://localhost:3001/discussion/cancelDownvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }
        }
        // if the user has already upvoted, cancel the upvote and downvote
        else if (!downvoted && upvoted) {
            setDownvoted(true)
            setUpvoted(false)
            setDownvotes(downvotes + 1)
            setUpvotes(upvotes - 1)

            try {
                axios.post("http://localhost:3001/discussion/cancelUpvote", { discussionId })
            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }

            try {
                axios.post("http://localhost:3001/discussion/downvote", { discussionId })

            }
            catch (err) {
                toast.error("Couldn't reach the server, downvote failed")
            }
        }
        // if the user hasn't upvoted or downvoted, downvote
        else if (!downvoted && !upvoted) {
            setDownvotes(downvotes + 1)
            setDownvoted(true)

            try {
                axios.post("http://localhost:3001/discussion/downvote", { discussionId })

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