import React, { useState } from 'react'


export default function Location(props) {
/*
    const [stateObject, setObjectState] = useState({
        firstKey: '',
        secondKey: '',
    });    

    setObjectState((prevState) => ({
        ...prevState, 
        secondKey: 'value',
    }));
*/

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
                <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                    Flytta upp
                </button>
                <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                    Flytta upp
                </button>
            </li>
        </>
    )
}
