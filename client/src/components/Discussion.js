import React from 'react'
import { useEffect } from 'react'

function Discussion({ id, title, upvotes, downvotes, comments }) {
  const displayProps = () => {
    console.log(id)
    console.log(title)
    console.log(upvotes)
    console.log(downvotes)
    console.log(comments)
  }

  return (
    <div>
      
    </div>
  )
}

export default Discussion
