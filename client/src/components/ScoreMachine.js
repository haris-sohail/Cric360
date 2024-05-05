import React from 'react'
import '../css/ScoreMachine.css'

function ScoreMachine() {
  return (
    <div className='score-machine-container'>
        <button><h6>0</h6></button>
        <button><h6>1</h6></button>
        <button><h6>2</h6></button>
        <button><h6>3</h6></button>
        <button><h6>4</h6></button>
        <button><h6>5</h6></button>
        <button><h6>6</h6></button>
        <button><h6>WD</h6></button>
    </div>
  )
}

export default ScoreMachine