import React from 'react';
import Leafletmap from './LeafletMap';

export default function GameOutdoorNavigation(props) {
  console.log("GAMEOUTDOORNAV")
  console.log(props.destination[0])
  console.log(props.destination[1])

  function setUserArrivedHelper(lat, lng){
    let userLocationLat = lat //runda av här
    let userLocationLng = lng //runda av här
    let quizMarkerLat = props.destination[0] // runda av här
    let quizMarkerLng = props.destination[1] // runda av här

    if((quizMarkerLat === userLocationLat) && (quizMarkerLng === userLocationLng)){
    props.setUserArrived(true);
    }
  }

  return (
    <div className='row'>
      <div className='col s12'>
        <Leafletmap currentQuestion={props.currentQuestion} destination={props.destination} setUserArrived={setUserArrivedHelper}/>
      </div>
    </div>
  )
}
