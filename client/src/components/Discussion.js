import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import upvote from '../system/assets/upvote.png'
import downvote from '../system/assets/downvote.png'
import comment from '../system/assets/comment.png'
import '../css/Discussion.css'

function Discussion({ id, title, upvotes, downvotes, username, comments }) {
  const navigate = useNavigate();

  const displayProps = () => {
    console.log(id)
    console.log(title)
    console.log(upvotes)
    console.log(downvotes)
    console.log(username)
    console.log(comments)
  }

  const handleDiscussionClick = (e) => {
    navigate('/discussionPage', { state: { username } })
  }

  return (
    <a onClick={handleDiscussionClick} id='anchor-discussion-container'>
      <div className='discussion-container'>
        <div className='title-container'>
          <h2>{title}</h2>
        </div>

        <div className='info-container'>
          <div className='upvotes-container'>
            <img src={upvote}></img>
            <p>{upvotes}</p>
          </div>

          <div className='downvotes-container'>
            <img src={downvote}></img>
            <p>{downvotes}</p>
          </div>

          <div className='comments-container'>
            <img src={comment}></img>
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default Discussion
