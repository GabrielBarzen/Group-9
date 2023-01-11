import React from "react";
import { Link } from "react-router-dom";

export default function Tour(props) {
  /*
  Tour handles and renders each single tour passed on from ModOverview.js
  */
  const url = "/moderator/edit/" + props.data.id;

  return (
    /*
    Link is part of "react-router-dom" and is used to provide navigation to specified URL, 
    if additional data needs to follow to the new URL this is setup in its state like this: state={{ data: myData }}
    */
    <>
      <li className='collection-item row'>

        <i className="material-icons col s1">location_on</i>
        <Link className="col s9 offset-s1" style={{ cursor: 'pointer', 'fontSize': '1rem', 'color': 'black' }} to={url} state={{ data: props.data }}>
          {props.data.title}
          <p>Quiz kod: {props.data.code}</p>
        </Link>


        <span className='col s1 right' style={{ cursor: 'pointer', 'fontSize': '2rem' }}><i className='material-icons right black-text' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>

      </li>
    </>
  );
}

