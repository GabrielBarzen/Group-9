import React from 'react';

export default function AdminModRoutes(props) {

  function handleDelete(){
    //tar bort en route från en moderator
    props.unassignRouteFromMod(props.route.id, props.moderator["user-id"]);
  }
  return (
    <li className='row'>
        <p className='col s10'>{props.route.title}</p><i className="small material-icons col s2" onClick={handleDelete}>delete_forever</i>
    </li>
  )
}

