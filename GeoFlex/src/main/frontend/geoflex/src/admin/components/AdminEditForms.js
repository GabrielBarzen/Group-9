import React, { useRef, useEffect } from 'react';
import Location from './Location';
import M from 'materialize-css'

export default function AdminEditForms(props) {

    let titleRef = useRef();
    let descriptionRef = useRef();

    useEffect(() => {
        M.AutoInit();
        M.updateTextFields();

    }, []);

    const dataLength = props.locationsData.route.location.length;


    function swapLocationsUp(idFrom) {
        /*
        onClick function to move a location-object up
        receives the ID from a specific location
        using forEach to sort out the ID of the location rendered below and sends "idFrom, idTo" to updateLocation()
        location_index will always be ordered ascending, making it possible to find the right object    
        */
        let routeID = props.mainData.id;
        var temp = "";
        var idToIndex = "";
        var idTo = "";
        props.locationsData.route.location.forEach((element) => {
            if (element.id === idFrom) {
                temp = parseInt(element.location_index);
                idToIndex = temp - 1;
            }
        });

        props.locationsData.route.location.forEach((item) => {
            if (item.location_index === idToIndex.toString()) {
                idTo = item.id;
            }
        });
        props.callMoveLocation(routeID, idFrom, idTo);
    }

    function swapLocationsDown(idFrom) {
        /*
        onClick function to move a location-object down
        receives the ID from a specific location
        using forEach to sort out the ID of the location rendered above and sends "idFrom, idTo" to updateLocation()
        location_index will always be ordered ascending, making it possible to find the right object    
        */
        let routeID = props.mainData.id;
        var temp = "";
        var idToIndex = "";
        var idTo = "";
        props.locationsData.route.location.forEach((element) => {
            if (element.id === idFrom) {
                temp = parseInt(element.location_index);
                idToIndex = temp + 1;
            }
        });

        props.locationsData.route.location.forEach((item) => {
            if (item.location_index === idToIndex.toString()) {
                idTo = item.id;
            }
        });
        props.callMoveLocation(routeID, idFrom, idTo);
    }

    function handleDelete(id) {
        let routeID = props.mainData.id;
        props.callDeleteLocation(routeID, id);
    }

    const handleNewLocation = (() => {
        let id = props.mainData.id;
        props.callNewLocation(id);
    })

    const handleSave = (() => {
        let routeID = props.mainData.id;
        let title = titleRef.current.value;
        let description = descriptionRef.current.value;
        props.callSaveRoute(routeID, title, description);

    })


    return (
        <>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className='col s12 m10 l10 offset-l1 offset-m1'>
                            <h5 className="center align">Redigering</h5>
                        </div>

                        <div className="input-field col s12 m10 l10 offset-l1 offset-m1">
                            <i className="material-icons prefix">label</i>
                            <label htmlFor="title">Titel</label>
                            <input
                                id="title"
                                type="text"
                                defaultValue={props.mainData.title}
                                ref={titleRef}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m10 l10 offset-l1 offset-m1">
                            <i className="material-icons prefix">mode_edit</i>
                            <label htmlFor="description">Beskrivning</label>
                            <textarea
                                type="text"
                                className="materialize-textarea"
                                id="description"
                                defaultValue={props.mainData.description}
                                ref={descriptionRef}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <ul className="">

                                {[...props.locationsData.route.location].map((location) => (
                                    <Location
                                        key={location.id}
                                        data={location}
                                        dataLength={dataLength}
                                        deleteLocation={handleDelete}
                                        swapLocationsUp={swapLocationsUp}
                                        swapLocationsDown={swapLocationsDown}
                                    />
                                ))}
                            </ul>
                            <div className="row">
                                <div className='col 4 offset-m1' onClick={handleSave}>
                                    <a class="waves-effect waves-light btn green lighten-1" ><i className="material-icons col s1">
                                        save
                                    </i> Spara</a>
                                </div>
                                <div className='col 7 offset-s1 offset-m5 offset-l6' onClick={handleNewLocation}>
                                    <a class="waves-effect waves-light btn yellow lighten-3 black-text" ><i className="material-icons col s1">
                                        add_circle_outline
                                    </i> Lägg till</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}