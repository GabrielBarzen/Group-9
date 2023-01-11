import React from "react";


export default function Tour(props) {
  console.log(props.data.title)
  /*
  Tour handles and renders each single tour passed on from AdminOverview.js
  */

 
  return (
    /*
    Link is part of "react-router-dom" and is used to provide navigation to specified URL, 
    if additional data needs to follow to the new URL this is setup in its state like this: state={{ data: myData }}
    */
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

