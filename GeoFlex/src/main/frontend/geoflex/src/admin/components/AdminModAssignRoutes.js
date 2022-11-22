import React from 'react';

export default function AdminModAssignRoutes(props) {
    const handleAddRouteToMod = () => {
        //lägger till route till en moderator
        alert("SELECT ITEM CLICK");
    }
  return (<p id={props.selectItem.id} >
    {props.selectItem.title}
    <i className="small material-icons right" onClick={handleAddRouteToMod}>add</i>
  </p>
    
  )
}
