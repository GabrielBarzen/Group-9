import React, { useState } from 'react'


export default function Location(props) {

    const [stateObject, setObjectState] = useState({
        firstKey: '',
        secondKey: '',
    });    

    setObjectState((prevState) => ({
        ...prevState, 
        secondKey: 'value',
    }));
    return (
        <>{!props.data.last_location ? (
            <li className='row card-panel'>

                <i className="material-icons col s1">place</i>
                <span className='col s9'>
                    {props.data.name}
                </span>
                <button onClick={() => { props.deleteLocation(props.data.id) }}>
                    Ta bort
                </button>
                <button
                    id={props.data.id}
                    data_location_index={props.data.location_index}
                    onClick={event => { props.swapLocationsUp(event, props.data.id) }}>
                    Flytta upp
                </button>
            </li>
        ) : (
            <li className='row green lighten-2 card-panel'>
                <i className="material-icons col s1">cake</i>
                <span className='col s9'>
                    {props.data.name}
                </span>
            </li>)}
        </>
    )
}
