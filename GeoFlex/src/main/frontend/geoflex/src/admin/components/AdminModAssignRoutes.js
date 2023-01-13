import React from 'react';

export default function AdminModAssignRoutes(props) {
    const handleAddRouteToMod = () => {
        //anrop till parent-komponent; lägger till route till en moderator
        props.assignRouteToMod(props.selectItem.id, props.moderatorID);
    }

  return (<p id={props.selectItem.id} >
    {props.selectItem.title}
    <i className="small material-icons right" onClick={handleAddRouteToMod}>add</i>
  </p>
    
  )
}
