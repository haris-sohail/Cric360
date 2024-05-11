import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import Navbar from './Navbar';
import '../css/DiscussionComments.css'
import DiscussionComment from './DiscussionComment';

function DiscussionComments() {
    const location = useLocation()
    const data = location.state
    const username = data.username
    const discussion = data.discussion
    const [currentComment, setCurrentComment] = useState('')
    const [comments, setComments] = useState(discussion.comments)
    const [commentsComponents, setCommentsComponents] = useState()

    useEffect(() => {
        if (comments) {
            const commentsComp = comments.map(comment => (
                <DiscussionComment
                    key={comment._id}
                    postedBy={comment.postedBy}
                    commentText={comment.text}
                />
            ))

            setCommentsComponents(commentsComp)
        }
    }, [comments])

    const handleAddComment = () => {
        const discussion_id = discussion.id;
        const comment = currentComment.trim()

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/discussion/addComment`, { discussion_id, currentComment: comment, username })
            .then(res => {
                setComments([...comments, { postedBy: username, text: currentComment }]);
                setCurrentComment('');
            })
            .catch(err => {
                toast.error("Couldn't reach server, comment post failed");
            });
    };


    return (
        <div className='discussion-comments-container'>
            <Navbar username={username} />
            <div className='discussion-comments-main-content'>
                <h1>Comments</h1>
                <div className='add-comment-container'>
                    <input placeholder='Add a comment' value={currentComment} onChange={(e) => { setCurrentComment(e.target.value) }}></input>
                    <button onClick={handleAddComment}><h6>Post</h6></button>
                </div>

                {(comments.length != 0) && (
                    <div className='comments-container-discussion-comments'>
                        {commentsComponents}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DiscussionComments