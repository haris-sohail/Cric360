import React from 'react'
import '../css/HeadingMessage.css'

function HeadingMessage({ message }) {
    return (
        <div className='heading-msg-container'>
            <h1>{message}</h1>
        </div>
    )
}

export default HeadingMessage