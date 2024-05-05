import React from 'react'
import '../css/ScoreMachine.css'

function ScoreMachine({ onButtonPress }) {
  const handleButtonClick = (value) => {
    onButtonPress(value);
  };
  return (
    <div className='score-machine-container'>
      <button onClick={() => handleButtonClick('MISS')}><h6>0</h6></button>
      <button onClick={() => handleButtonClick(1)}><h6>1</h6></button>
      <button onClick={() => handleButtonClick(2)}><h6>2</h6></button>
      <button onClick={() => handleButtonClick(3)}><h6>3</h6></button>
      <button onClick={() => handleButtonClick(4)}><h6>4</h6></button>
      <button onClick={() => handleButtonClick(5)}><h6>5</h6></button>
      <button onClick={() => handleButtonClick(6)}><h6>6</h6></button>
      <button onClick={() => handleButtonClick('WD')}><h6>WD</h6></button>
      <button onClick={() => handleButtonClick('OUT')}><h6>OUT</h6></button>
    </div>
  )
}

export default ScoreMachine