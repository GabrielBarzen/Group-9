import React from 'react'
import { Link } from 'react-router-dom'

export default function Tour(props) {
    
    const url = "/admin/edit/" + props.data.id;
    /*const editTo = {
        pathname: url,
        state: props.data
    };*/
  return (
    <>
    <li>
    <Link to={url} state={{data: props.data}}>
    {props.data.title}</Link>
        <button id={props.data.id} onClick={() => {props.deleteItem(props.data.id)}}>Ta bort</button>
        <button>Redigera</button>
    </li>
    </>
  )
}
