import React from "react";

export default function GameTour(props) {
  /*
  GameTour handles and renders each single tour passed on from parent component
  */

  return (
    <>
      <li className='collection-item row'>
        <i className="material-icons col s1">location_on</i>
        <p className="col s9 offset-s1" style={{ 'fontSize': '1rem', 'color': 'black' }}>
          {props.data.title}
        </p>

      </li>
    </>
  );
}

