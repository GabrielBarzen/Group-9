import React from 'react';
import Leafletmap from './LeafletMap';

export default function GameOutdoorNavigation(props) {
  /**
   * functional component that extends setUserArrived() from parent component and renders the leafletMap component
   */
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