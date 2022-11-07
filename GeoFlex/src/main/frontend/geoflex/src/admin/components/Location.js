import React from 'react'


export default function Location(props) {
    return (
        <>
            <li className='row card-panel'>

                <i className="material-icons col s1">place</i>
                <span className='col s9'>
                    {props.data.name}
                </span>
                <button onClick={() => { props.deleteLocation(props.data.id) }}>
                    Ta bort
                </button>
                <button id={props.data.id} data_location_index={props.data.location_index} onClick={() => { props.swapLocationsUp(this) }}>Flytta upp</button>
            </li>
        </>
    )
}
