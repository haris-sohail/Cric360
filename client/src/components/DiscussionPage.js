import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import '../css/DiscussionPage.css'
import DiscussionStats from './DiscussionStats'

function DiscussionPage() {
    const location = useLocation();
    const data = location.state;
    const username = data.username;

    return (

        <div className='discussion-page-container'>
            <Navbar username={data.username} />
            <div className='main-content-container-discussion-page'>


                <h3 style={{ margin: 0 }}><em id='discussion-posted-by'>{username}</em></h3>

                <div className='discussion-content-container'>
                    <h1>{data.title}</h1>
                    <p
                        id='discussion-text'
                        style={{ whiteSpace: 'pre-line', textAlign: 'justify'}}
                    >
                        {data.text}
                    </p>
                </div>
            </div>

            <DiscussionStats discussionId={data.id} />
        </div>
    )
}

export default DiscussionPage