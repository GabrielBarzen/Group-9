import React from "react";
import { Link } from "react-router-dom";

export default function Tour(props) {  

  const url = "/admin/edit/" + props.data.id;
  /*const editTo = {
        pathname: url,
        state: props.data
    };*/
  return (
    <>
    <li className='collection-item row'>
      
        <i className="material-icons col s1">location_on</i>
          <Link className="col s9 offset-s1" style={{cursor: 'pointer', 'fontSize': '1rem', 'color': 'black'}} to={url} state={{ data: props.data }}>
            {props.data.title}
          </Link>
          <span className='col s1 right' style={{cursor: 'pointer', 'fontSize': '2rem'}}><i className='material-icons right black-text' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>
        
    </li>
    </>
  );
}

/*

 <li className='row'>
        <Link style={{cursor: 'pointer', 'font-size': '2rem'}} className='col s10 waves-effect waves-teal btn-edit white-text z-depth-2' to={url} state={{ data: props.data }}>
          {props.data.title}
        </Link>
        <span style={{cursor: 'pointer', 'font-size': '2rem'}} className="col s2 waves-effect waves-red red darken-3 btn-delete center-align right z-depth-2"><i className='material-icons' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>
        
      </li>
*/
