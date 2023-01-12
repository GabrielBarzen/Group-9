import React, { useEffect } from 'react';
import M from 'materialize-css';

export default function Location(props) {
    /**
     * renders html for the locations based on their order
     */

    const end = props.dataLength - 1;
    const currentIndex = props.data.location_index;

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
                                <p style={{ 'margin-left': '1rem' }}>{props.data.name}</p>
                            </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s3 m3 offset-s1 offset-m2'>
                            <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.id) }} id="btn-small-screen">
                                <i className="material-icons col s1" id="icon-small-screen">
                                    delete_forever
                                </i> Radera</a>
                        </div>
                        <div className='col s1 offset-s6 offset-m5 offset-l5'>
                            <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                className='material-icons right black-text large'
                                onClick={() => { props.swapLocationsDown(props.data.location_index) }}>keyboard_arrow_down</i>
                        </div>
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
                <>
                    <li className='row'>
                        <div className='row'>
                            <div className='col s1 offset-m1 offset-l1'>
                                <i className="material-icons col s1">place</i>
                            </div>
                            <div className='col s7'>
                                <span className=''>
                                    <p style={{ 'margin-left': '1rem' }}>{props.data.name}</p>
                                </span>
                            </div>
                            <div className='col s1 offset-s2 offset-m1'>
                                <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                    className='material-icons right black-text large'
                                    onClick={() => { props.swapLocationsUp(props.data.id) }}>keyboard_arrow_up</i>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s3 m3 l2 offset-s1 offset-m2 offset-l2'>
                                <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.id) }} id="btn-small-screen">
                                    <i className="material-icons col s1" id="icon-small-screen">
                                        delete_forever
                                    </i> Radera</a>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="divider col s10 offset-s1"></div>
                        </div>
                    </li>
                </>
            </>
        )
    }

    const lastLocation = () => {
        /**
         * returns html for the last location         * 
         */
        return (
            <>
                <>
                    <li className='row'>
                        <div className='row'>
                            <div className='col s1 offset-m1 offset-l1'>
                                <i className="material-icons col s1">place</i>
                            </div>
                            <div className='col s7'>
                                <span className=''>
                                    <p style={{ 'margin-left': '1rem' }}>{props.data.name}</p>
                                </span>
                            </div>
                            <div className='col s1 offset-s2 offset-m1'>
                                <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                    className='material-icons right black-text large'
                                    onClick={() => { props.swapLocationsUp(props.data.id) }}>keyboard_arrow_up</i>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="divider col s10 offset-s1"></div>
                        </div>
                    </li>
                </>
            </>
        )
    }

    const middleLocations = () => {
        /**
         * returns html for all locations between the "first location" and the "end location"
         */
        return (
            <>
                <>
                    <li className='row'>
                        <div className='row'>
                            <div className='col s1 offset-m1 offset-l1'>
                                <i className="material-icons col s1">place</i>
                            </div>
                            <div className='col s7'>
                                <span className=''>
                                    <p style={{ 'margin-left': '1rem' }}>{props.data.name}</p>
                                </span>
                            </div>
                            <div className='col s1 offset-s2 offset-m1'>
                                <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                    className='material-icons right black-text large'
                                    onClick={() => { props.swapLocationsUp(props.data.id) }}>keyboard_arrow_up</i>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s3 m3 l2 offset-s1 offset-m2 offset-l2'>
                                <a className="waves-effect waves-light btn  red lighten-1" onClick={() => { props.deleteLocation(props.data.id) }} id="btn-small-screen">
                                    <i className="material-icons col s1" id="icon-small-screen">
                                        delete_forever
                                    </i> Radera</a>
                            </div>
                            <div className='col s1 offset-s6 offset-m5 offset-l6'>
                                <i style={{ cursor: 'pointer', 'fontSize': '2rem', 'lineHeight': '1' }}
                                    className='material-icons right black-text large'
                                    onClick={() => { props.swapLocationsDown(props.data.id) }}>keyboard_arrow_down</i>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="divider col s10 offset-s1"></div>
                        </div>
                    </li>
                </>
            </>
        )
    }

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