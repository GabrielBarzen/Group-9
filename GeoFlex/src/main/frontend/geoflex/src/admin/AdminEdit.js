import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdminEdit() {
    const location = useLocation();
    const data = location.state.data
    
    const [updateTour, setUpdateTour] = useState();
    let titleRef = useRef();
    let descriptionRef = useRef();
    let locationsRef = useRef();
    let typeRef = useRef();
    
    const handleSave = (event) =>{
        console.log(event)
        console.log("Hejsan")
        let validation = true;

        if(titleRef.current.value===""){
            validation = false;
        }
        if(descriptionRef.current.value===""){
            validation = false;
        }
        if(locationsRef.current.value=== "0"){
            validation = false;
        }
        if(typeRef.current.value===""){
            validation = false;
        }

        if(validation){
            let toUpdate = { "route":{
            "title": titleRef.current.value,
            "description": descriptionRef.current.value,
            "type": typeRef.current.value,
            "id": data.id,
            "code": data.code,
            "locations": parseInt(locationsRef.current.value)
            }}
            console.log(toUpdate.title)
            console.log(toUpdate.description)
            console.log(toUpdate.type)
            console.log(toUpdate.id)
            console.log(toUpdate.code)
            console.log(toUpdate.locations)
        }
    };

    return (<>
        <div>
            <label>Titel</label>
            <input type="text" defaultValue={data.title} ref={titleRef} />
            <label>Beskrivning</label>
            <textarea type="text" defaultValue={data.description} ref={descriptionRef} />
            <label>Antal platser</label>
            <select defaultValue={data.locations.toString()} ref={locationsRef}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select>
            <label>Typ</label>
            <select defaultValue={data.type} ref={typeRef}>
                <option value=""></option>
                <option value="QUIZ">Quiz</option>
                <option value="INFO">Inforunda</option>
            </select>
            <button onClick={event => handleSave(event)}>Spara</button>
        </div>
        
    </>

    )
}
