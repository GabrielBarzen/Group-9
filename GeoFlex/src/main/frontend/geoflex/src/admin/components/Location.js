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
    const renderLocation = () => {
        props.data.forEach(element => {
            if (element.location_index === "1") {
                return (
                    <li className='row card-panel'>

                        <i className="material-icons col s1">place</i>
                        <span className='col s9'>
                            {props.data.name}
                        </span>
                        <button onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                            Flytta ner
                        </button>
                    </li>
                )
            } else if (element.location_index !== element.location_index.length - 2) {
                return (
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
                        <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                            Flytta ner
                        </button>
                    </li>
                )
            } else if (element.location_index === element.location_index.length - 1) {
                return (
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
                    </li>
                )
            } else if (element.last_location === "true") {
                return (
                    <li className='row card-panel'>

                        <i className="material-icons col s1">place</i>
                        <span className='col s9'>
                            {props.data.name}
                        </span>
                    </li>
                )
            }
        });
    }

    return (
        <>
            {renderLocation}
        </>
    )
}
