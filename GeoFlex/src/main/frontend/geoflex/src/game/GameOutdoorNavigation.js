import React from 'react';
import Leafletmap from './LeafletMap';

export default function GameOutdoorNavigation(props) {
  console.log("GAMEOUTDOORNAV")
  console.log(props.destination[0])
  console.log(props.destination[1])

  function setUserArrivedHelper(){
    props.setUserArrived(true);
  }
  
  return (
    <div className='row'>
      <div className='col s12'>
        <Leafletmap currentQuestion={props.currentQuestion} destination={props.destination} setUserArrived={setUserArrivedHelper}/>
      </div>
    </div>
  )
}
