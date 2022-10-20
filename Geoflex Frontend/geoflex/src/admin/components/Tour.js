import React from 'react'
import { Link } from 'react-router-dom'

export default function Tour(props) {
    console.log(props);
    const url = "/admin/edit/" + props.data.id;
    /*const editTo = {
        pathname: url,
        state: props.data
    };*/
  return (
    <>
    <Link to={url} state={{data: props.data}}>
        <button id={props.data.id}>{props.data.title}</button>
    </Link>
    </>
  )
}
