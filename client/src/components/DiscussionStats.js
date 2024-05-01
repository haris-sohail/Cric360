import React from 'react'
import '../css/DiscussionStats.css'
import upvote from '../system/assets/upvote.png'
import downvote from '../system/assets/downvote.png'
import comment from '../system/assets/comment.png'

function DiscussionStats() {
    return (
        <div className='dicussion-stats-container'>
            <div className='upvotes-downvotes-container'>
                <a>
                    <img src={upvote} className='stats-img-discussion-page'></img>
                </a>

                <a>
                    <img src={downvote} className='stats-img-discussion-page'></img>
                </a>

                <a>
                    <img src={comment} className='stats-img-discussion-page'></img>
                </a>
            </div>
        </div>
    )
}

export default DiscussionStats