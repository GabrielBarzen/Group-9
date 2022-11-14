import React, { useEffect } from 'react';
import M from 'materialize-css';
import LocationForm from './LocationForm';

export default function Location(props) {
    /**
     * renders html for the locations based on their order
     * Location.js renders each single location-object received
     * all properties and functions is mapped through props.
     */

    const currentValue = props.data;

    const end = props.dataLength - 1;
    const currentIndex = props.data.location_index;

    const firstLocation = () => {
        /**
         * renders html for the first location.
         */
        return (
            <>
                <li className='row card-panel'>
                    <section >
                        <i className="material-icons col s1">place</i>
                        <span className='col s8'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <button className='col s1' onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button className='col s1' onClick={() => { props.swapLocationsDown(props.data.id) }}>
                            Flytta ner
                        </button>
                        <button className='col s1 collapsible-header'>Redigera</button>
                    </section>
                    <section className='collapsible-body'>
                        <LocationForm data={currentValue} />
                    </section>
                </li>
            </>
        )
    }

    const middleLocations = () => {
        /**
         * renders html for all locations between the "first location" and the "end location"
         */
        return (
            <>
                <li className='row card-panel'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s7'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <button className='col s1' onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button className='col s1' onClick={() => { props.swapLocationsUp(props.data.id) }}>
                            Flytta upp
                        </button>
                        <button className='col s1' onClick={() => { props.swapLocationsDown(props.data.id) }}>
                            Flytta ner
                        </button>
                        <button className='col s1 collapsible-header'>Redigera</button>
                    </section>
                    <section className='collapsible-body'>
                        <LocationForm data={currentValue} />
                    </section>
                </li>
            </>

        )
    }

    const endLocation = () => {
        /**
         * renders hmtl for the end location
         */
        return (
            <>
                <li className='row card-panel'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s8'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <button className='col s1' onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button className='col s1' onClick={() => { props.swapLocationsUp(props.data.id) }}>
                            Flytta upp
                        </button>
                        <button className='col s1 collapsible-header'>Redigera</button>
                    </section>
                    <section className='collapsible-body'>
                        <LocationForm data={currentValue} />
                    </section>
                </li>
            </>
        )
    }

    const lastLocation = () => {
        /**
         * returns html for the last location
         */
        return (<>
            <li className='row card-panel'>
                <section className=''>
                    <i className="material-icons col s1">place</i>
                    <span className='col s10'>
                        {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                    </span>
                    <button className='col s1 collapsible-header'>Redigera</button>
                </section>
                <section className='collapsible-body'>
                    <LocationForm data={currentValue} />
                </section>
            </li>
        </>)
    }

    if (currentIndex === "1") {
        return (
            firstLocation()
        )
    } else if (currentIndex === end.toString()) {
        return (
            endLocation()
        )
    } else if (currentIndex === undefined) {
        return (
            lastLocation()
        )
    } else {
        return (
            middleLocations()
        )
    }

}