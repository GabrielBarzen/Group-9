import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Location from './components/Location';
import M from 'materialize-css';
import axios from 'axios';

export default function AdminEdit() {
    const location = useLocation();
    const data = location.state.data
    const data2 = { "route": { "location": [{ "name": "1", "text_info": "Replace me", "id": "179", "location_index": "1", "last_location": "false" }, { "name": "2", "text_info": "Replace me", "id": "180", "location_index": "2", "last_location": "false" }, { "name": "3", "text_info": "Replace me", "id": "181", "location_index": "3", "last_location": "false" }, { "name": "4", "text_info": "Replace me", "id": "182", "location_index": "4", "last_location": "false" }, { "name": "5", "text_info": "Replace me", "id": "183", "location_index": "5", "last_location": "false" }, { "name": "6", "text_info": "Replace me", "id": "184", "last_location": "true" }], "locations": 0 } };

    useEffect(()=>{
        var config = {
            method: 'get',
            url: '/admin/routeLocations?route-id='+data.id,
            headers: { 
              
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    })
    const [updateTour, setUpdateTour] = useState();
    let titleRef = useRef();
    let descriptionRef = useRef();
    const [updatedLocationsData, setLocationsData] = useState()
    let typeRef = useRef();
    let testRef2 = useRef();
    const [testRef, setTestRef] = useState("");


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
                    "id": data.id,
                    "code": data.code,
                    "locations": updatedLocationsData
                }
            }            
        }
    };
    useEffect(() => {
        M.AutoInit();
    }, []);

    function handleTest(){
        if(testRef2.current.value.length != 0){
            setTestRef(testRef2.current.value)
        }
    }

    return (<>
        <fieldset>
            <div>
            <p>HÄR</p>
            <p>{testRef}</p>
            <label>test</label>
            <input type="text" onKeyUp={handleTest} ref={testRef2} />
            </div>
            <label>Titel</label>
            <input type="text" defaultValue={data.title} ref={titleRef} />
            <label>Beskrivning</label>
            <textarea type="text" defaultValue={data.description} ref={descriptionRef} />
            <label>Typ</label>
            <select defaultValue={data.type} ref={typeRef}>
                <option value=""></option>
                <option value="QUIZ">Quiz</option>
                <option value="INFO">Inforunda</option>
            </select>
            <ul className="collapsible">
                {[...data2.route.location].map(location => <Location key={location.id} data={location} />)}

            </ul>
            <button onClick={event => handleSave(event)}>Spara</button>
        </fieldset>

    </>

    )
}
