import React from 'react'
import { Link } from 'react-router-dom'

export default function Tour(props) {
    console.log(props)
    
    const url = "/admin/edit/" + props.data.id;
    /*const editTo = {
        pathname: url,
        state: props.data
    };*/
  return (
    <>
    <li>
      <div class="collection">
        <i class="material-icons">filter_drama</i>
          <Link style={{cursor: 'pointer', 'font-size': '2rem'}} to={url} state={{ data: props.data }}>
            {props.data.title}
          </Link>
          <span style={{cursor: 'pointer', 'font-size': '2rem'}}><i className='material-icons' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>
        </div>
    </li>
    </>
  )
}

/*

 <li className='row'>
        <Link style={{cursor: 'pointer', 'font-size': '2rem'}} className='col s10 waves-effect waves-teal btn-edit white-text z-depth-2' to={url} state={{ data: props.data }}>
          {props.data.title}
        </Link>
        <span style={{cursor: 'pointer', 'font-size': '2rem'}} className="col s2 waves-effect waves-red red darken-3 btn-delete center-align right z-depth-2"><i className='material-icons' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>
        
      </li>
*/