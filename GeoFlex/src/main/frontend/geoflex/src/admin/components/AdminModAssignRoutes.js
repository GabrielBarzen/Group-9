import React from 'react';

export default function AdminModAssignRoutes(props) {
    const handleAddRouteToMod = () => {
        //lägger till route till en moderator
        props.assignRouteToMod(props.selectItem.id, props.moderatorID);
    }

    const handleRemoveRouteToMod = () => {
      //tar bort  route från en moderator
      props.unassignRouteToMod(props.selectItem.id, props.moderatorID);
  }

  return (<p id={props.selectItem.id} >
    {props.selectItem.title}
    <i className="small material-icons right" onClick={handleAddRouteToMod}>add</i>
  </p>
    
  )
}
