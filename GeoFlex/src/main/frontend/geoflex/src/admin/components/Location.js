import React, { useEffect } from 'react';
import M from 'materialize-css'

export default function Location(props) {

    const dataLength = props.dataLength
    const end = props.dataLength - 1;
    const currentIndex = props.data.location_index;
    const firstLocation = () => {
        /**
         * 
         */
        return (
            <>
                <li className='row card-panel'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s9'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <button onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                            Flytta ner
                        </button>
                    </section>
                </li>
            </>
        )
    }
    const endLocation = () => {
        /**
         * 
         */
        return (
            <>
                <li className='row card-panel'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s9'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                        </span>
                        <button onClick={() => { props.deleteLocation(props.data.id) }}>
                            Ta bort
                        </button>
                        <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                            Flytta upp
                        </button>
                    </section>
                </li>
            </>
        )
    }

    const lastLocation = () => {
        /**
         * 
         */
        return (<>
            <li className='row card-panel'>
                <section className=''>
                    <i className="material-icons col s1">place</i>
                    <span className='col s9'>
                        {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                    </span>
                </section>
            </li>
        </>)
    }

    const middleLocations = () => {
        /**
         * 
         */
        return (
            <>
                <li className='row card-panel'>
                    <section className=''>
                        <i className="material-icons col s1">place</i>
                        <span className='col s9'>
                            {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
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
                    </section>
                </li>
            </>

        )
    }

    console.log(dataLength - 2);

    useEffect(() => {
        M.AutoInit();

    }, []);


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
