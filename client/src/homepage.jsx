import React from 'react';

const Homepage = (props) => {
    return (
      <div className="center">
        {props.showPopup ? 
        <div className='popup'>
          <div className='text'>Current Count: {props.count}</div>
          <div className='text'>Next Count: {props.nextCount}</div>
          <button className='button' onClick = {props.confirm}>Confirm</button>
          <button className='button' onClick = {props.cancel}>Cancel</button>
        </div> 
        : null}
        <div className='countrender'>
          <div className='text'>Count: {props.count}</div>
          <button className='button' type="Submit" onClick = {(e) => props.incrementCount(e,props.count)}>Increment</button>
        </div>
      </div>
    )
}

export default Homepage;