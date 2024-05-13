import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import upvote from '../system/assets/upvote.png'
import downvote from '../system/assets/downvote.png'
import comment from '../system/assets/comment.png'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import deleteBtn from '../system/assets/delete.png'
import '../css/Discussion.css'

function Discussion({ id, title, text, upvotes, downvotes, username, comments, postedBy, updateDeleteDiscussion }) {
  const navigate = useNavigate();
  const hideDeleteBtn = username !== postedBy;

  const displayProps = () => {
    console.log(id)
    console.log(title)
    console.log(upvotes)
    console.log(downvotes)
    console.log(username)
    console.log(comments)
  }

  const handleDiscussionClick = (e) => {
    if (e.target.tagName === 'IMG') return
    navigate('/discussionPage', { state: { id, title, text, upvotes, downvotes, username, comments, postedBy } })
  }

  const handleDiscussionDelete = () => {
    axios.post('http://localhost:3001/discussion/deleteDiscussion', { id: id })
      .then(res => {
        if (res.data) {
          updateDeleteDiscussion(id)
          toast.success('Discussion deleted successfully')
        }
      })
      .catch(err => {
        toast.error("Couldn't reach server, delete failed")
      })
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
          {(hideDeleteBtn) ? null :
            <div className='delete-btn-container'>
              <img onClick={handleDiscussionDelete} src={deleteBtn}></img>
            </div>
          }
        </div>
      </div>
    </a>
  )
}

export default Discussion
