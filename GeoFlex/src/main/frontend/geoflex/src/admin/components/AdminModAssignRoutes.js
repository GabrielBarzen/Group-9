import React from 'react';

export default function AdminModAssignRoutes(props) {
    const handleSelectItemClick = () => {
        alert("SELECT ITEM CLICK");
    }
  return (
    <option id={props.selectItem.id} value={props.selectItem.title} onClick={handleSelectItemClick}>{props.selectItem.title}</option>
  )
}
