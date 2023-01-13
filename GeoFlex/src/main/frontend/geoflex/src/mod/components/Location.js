import React, { useState } from 'react';
import ModEditLocation from '../ModEditLocation';
import LastLocationForm from './LastLocationForm';


export default function Location(props) {
    /**
     * renders html for the locations based on their order
     * Location.js renders each single location-object received
     * all properties and functions is mapped through props.
     */
    const [titleValue, setTitleValue] = useState(props.data.name)

    const currentValue = props.data;
    const end = props.dataLength - 1;
    const currentIndex = props.data.location_index;

    function handleChange(value) {
        setTitleValue(value);
    }

    const firstLocation = () => {
        /**
         * renders html for the first location.
         */
        return (
            <>
                <li className='row'>
                    <div className='row'>
                        <div className='col s1 offset-m1'>
                            <i className="material-icons col s1">place</i>
                        </div>
                        <div className='col s7'>
                            <span className=''>
                                <p style={{ 'margin-left': '1rem' }}>{titleValue}</p>
                            </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3 m3 l2 offset-s1 offset-m2 offset-l2 collapsible-header' style={{ 'borderBottom': '0' }}>
                            <a className="waves-effect waves-light btn grey darken-3" id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    edit
                                </i> Ändra</a>
                        </div>
                        <div className='col s3 m3'>
                            <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.location_id) }} id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    delete_forever
                                </i> Radera</a>
                        </div>

                        <div className='col s1 offset-s3 offset-m2 offset-l3'>
                            <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                className='material-icons right black-text large'
                                onClick={() => { props.swapLocationsDown(props.data.location_index) }}>keyboard_arrow_down</i>
                        </div>
                    </div>
                    <div className='collapsible-body col s12'>
                        <ModEditLocation
                            routeID={props.routeID}
                            data={currentValue}
                            handleChange={handleChange} />
                    </div>
                    <div className='row'>
                        <div className="divider col s10 offset-s1"></div>
                    </div>
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
                <li className='row'>
                    <div className='row'>
                        <div className='col s1 offset-m1 offset-l1'>
                            <i className="material-icons col s1">place</i>
                        </div>
                        <div className='col s7'>
                            <span className=''>
                                <p style={{ 'margin-left': '1rem' }}>{titleValue}</p>
                            </span>
                        </div>
                        <div className='col s1 offset-s2 offset-m1'>
                            <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                className='material-icons right black-text large'
                                onClick={() => { props.swapLocationsUp(props.data.location_index) }}>keyboard_arrow_up</i>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3 m3 l2 offset-s1 offset-m2 offset-m1 offset-l2 collapsible-header' style={{ 'borderBottom': '0' }}>
                            <a className="waves-effect waves-light btn grey darken-3" id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    edit
                                </i> Ändra</a>
                        </div>
                        <div className='col s3 m3 l2'>
                            <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.location_id) }} id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    delete_forever
                                </i> Radera</a>
                        </div>

                        <div className='col s1 offset-s3 offset-m2 offset-l4'>
                            <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                className='material-icons right black-text large'
                                onClick={() => { props.swapLocationsDown(props.data.location_index) }}>keyboard_arrow_down</i>
                        </div>
                    </div>
                    <div className='collapsible-body col s12'>
                        <ModEditLocation
                            routeID={props.routeID}
                            data={currentValue}
                            handleChange={handleChange} />
                    </div>
                    <div className='row'>
                        <div className="divider col s10 offset-s1"></div>
                    </div>
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
                <li className='row'>
                    <div className='row'>
                        <div className='col s1 offset-m1 offset-l1'>
                            <i className="material-icons col s1">place</i>
                        </div>
                        <div className='col s7'>
                            <span className=''>
                                <p style={{ 'margin-left': '1rem' }}>{titleValue}</p>
                            </span>
                        </div>
                        <div className='col s1 offset-s2 offset-m1'>
                            <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                className='material-icons right black-text large'
                                onClick={() => { props.swapLocationsUp(props.data.location_index) }}>keyboard_arrow_up</i>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3 m3 l2 offset-s1 offset-m2 offset-m1 offset-l2 collapsible-header' style={{ 'borderBottom': '0' }}>
                            <a className="waves-effect waves-light btn grey darken-3" id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    edit
                                </i> Ändra</a>
                        </div>
                        <div className='col s3 m3 l2'>
                            <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.location_id) }} id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    delete_forever
                                </i> Radera</a>
                        </div>
                    </div>
                    <div className='collapsible-body col s12'>
                        <ModEditLocation
                            routeID={props.routeID}
                            data={currentValue}
                            handleChange={handleChange} />
                    </div>
                    <div className='row'>
                        <div className="divider col s10 offset-s1"></div>
                    </div>
                </li>
            </>
        )
    }

    const lastLocation = () => {
        /**
         * returns html for the last location
         */
        return (
            <>
                <li className='row'>
                    <div className='row'>
                        <div className='col s1 offset-m1 offset-l1'>
                            <i className="material-icons col s1">place</i>
                        </div>
                        <div className='col s7'>
                            <span className=''>
                                <p style={{ 'margin-left': '1rem' }}>{titleValue}</p>
                            </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3 m3 l2 offset-s1 offset-m2 offset-m1 offset-l2 collapsible-header' style={{ 'borderBottom': '0' }}>
                            <a className="waves-effect waves-light btn grey darken-3" id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    edit
                                </i> Ändra</a>
                        </div>
                    </div>
                    <div className='collapsible-body col s12'>
                        <ModEditLocation
                            routeID={props.routeID}
                            data={currentValue}
                            handleChange={handleChange} />
                    </div>
                    <div className='row'>
                        <div className="divider col s10 offset-s1"></div>
                    </div>
                </li>
            </>
        )
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