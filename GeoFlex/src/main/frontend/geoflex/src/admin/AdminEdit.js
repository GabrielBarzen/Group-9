import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Location from './components/Location';
import M from 'materialize-css';
import axios from 'axios';

export default function AdminEdit() {
    const location = useLocation();
    const routeData = location.state.data;

    const [routeLocationsData, setRouteLocationsData] = useState([]);
    //const data2 = { "route": { "location": [{ "name": "1", "text_info": "Replace me", "id": "179", "location_index": "1", "last_location": "false" }, { "name": "2", "text_info": "Replace me", "id": "180", "location_index": "2", "last_location": "false" }, { "name": "3", "text_info": "Replace me", "id": "181", "location_index": "3", "last_location": "false" }, { "name": "4", "text_info": "Replace me", "id": "182", "location_index": "4", "last_location": "false" }, { "name": "5", "text_info": "Replace me", "id": "183", "location_index": "5", "last_location": "false" }, { "name": "6", "text_info": "Replace me", "id": "184", "last_location": "true" }], "locations": 0 } };


    const [updateTour, setUpdateTour] = useState();
    let titleRef = useRef();
    let descriptionRef = useRef();
    const [updatedLocationsData, setUpdatedLocationsData] = useState();
    let typeRef = useRef();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        var config = {
            method: 'get',
            url: '/admin/route/locations?route-id=' + routeData.id,
            headers: {

            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setRouteLocationsData(response.data);
                console.log(routeLocationsData);
            })
            .catch(function (error) {
                console.log(error);
                setRouteLocationsData(data2)
            });
    }, [status]);

    const handleSave = (event) => {
        console.log(event)
        console.log("Hejsan")
        let validation = true;

        if (validation) {
            let toUpdate = {
                "route": {
                    "title": titleRef.current.value,
                    "description": descriptionRef.current.value,
                    "type": typeRef.current.value,
                    "id": routeData.id,
                    "code": routeData.code,
                    "locations": updatedLocationsData
                }
            }
        }
    };
    useEffect(() => {
        M.AutoInit();
    }, []);
    /*
        function handleTest(){
            if(testRef2.current.value.length != 0){
                setTestRef(testRef2.current.value)
            }
        }
    
        <div>
            <p>HÄR</p>
            <p>{testRef}</p>
            <label>test</label>
            <input type="text" onKeyUp={handleTest} ref={testRef2} />
        </div>
    */
    function deleteLocation(id) {
        console.log("HÄR ÄR ROUTE ID" + routeData.id)
        console.log("HÄR ÄR ID: " + id)
        var data = JSON.stringify({
            "route-update": {
                "route-id": routeData.id,
                "location": [
                    {
                        "delete": id 
                    }
                ]
            }
        });

        var config = {
            method: 'patch',
            url: '/admin/route/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (!status) {
                    setStatus(true);
                  } else if (status) {
                    setStatus(false);
                  }
            })
            .catch(function (error) {
                console.log(error);
                //setEditLocations(data2)
            });

    }
    if (routeLocationsData.length != 0) {
        return (<>
            <fieldset>

                <label>Titel</label>
                <input type="text" defaultValue={routeData.title} ref={titleRef} />
                <label>Beskrivning</label>
                <textarea type="text" defaultValue={routeData.description} ref={descriptionRef} />
                <label>Typ</label>
                <select defaultValue={routeData.type} ref={typeRef}>
                    <option value=""></option>
                    <option value="QUIZ">Quiz</option>
                    <option value="INFO">Inforunda</option>
                </select>
                <ul className="">
                    {[...routeLocationsData.route.location].map(location => <Location key={location.id} data={location} deleteLocation={deleteLocation} />)}

                </ul>
                <button onClick={event => handleSave(event)}>Spara</button>
            </fieldset>

        </>

        )
    } else {
        return (<>
            <p>Laddar</p>
        </>)
    }

}
