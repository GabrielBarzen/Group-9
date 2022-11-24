import React from 'react';

export default function AdminModAssignRoutes(props) {
    const handleAddRouteToMod = () => {
        //lägger till route till en moderator
        props.assignRouteToMod(props.selectItem.id, props.moderator.id);
        //props.unassignRouteToMod();
    }
    
    const handleRemoveRouteToMod = () => {
      //lägger till route till en moderator
      //props.unassignRouteToMod();
  }

  return (<p id={props.selectItem.id} >
    {props.selectItem.title}
    <i className="small material-icons right" onClick={handleAddRouteToMod}>add</i>
  </p>
    
  )
}
