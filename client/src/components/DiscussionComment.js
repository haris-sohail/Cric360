import React from 'react'

function DiscussionComment({ postedBy, commentText }) {
  return (
    <div className='discussion-comment-container'>
      <h6>{postedBy}</h6>
      <p>{commentText}</p>
    </div>
  )
}

export default DiscussionComment