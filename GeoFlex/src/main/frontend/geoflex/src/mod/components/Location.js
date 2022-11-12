import React from 'react';
import M from 'materialize-css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function Location(props) {
    console.log("MOD LOCATION: ROUTE ID: " + props.route + " LOCATION ID: " + props.data.id)
    /*
    Location.js renders each single location-object received
    all properties and functions is mapped through props.

    TO DO: make sure the diffent buttons is placed right.
    */

    useEffect(() => {
        M.AutoInit();
      }, []);

const editLocationURL = '/mod/edit/' + props.route + '/location/' +props.data.id
    return (
        <>
            <li className='row card-panel'>
                <section className=''>
                <i className="material-icons col s1">place</i>
                <span className='col s9'>
                    {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                </span>
                <Link to={editLocationURL} state={{ data: props.data, route: props.route}} >
                <button>
                    Redigera plats
                </button>
                </Link>
                <button onClick={() => { props.deleteLocation(props.data.id) }}>
                    Ta bort
                </button>
                <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                    Flytta upp
                </button>
                <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                    Flytta ner
                </button>
                </section>
                
            </li>
        </>
    )
}
