import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAddNew() {
    /*
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [locations, setLocations] = useState();
    const [type, setType] = useState();
    */
    const [updateTour, setUpdateTour] = useState();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationsRef = useRef();
    const typeRef = useRef();

    const navigate = useNavigate();

    const handleSave = (event) =>{
        console.log(titleRef.current.value);
        console.log(descriptionRef.current.value);
        console.log(locationsRef.current.value);
        console.log(typeRef.current.value);

        let validation = true;
        if(titleRef.current.value===""){
            validation=false;
        }
        if(descriptionRef.current.value===""){
            validation=false
        }
        if(locationsRef.current.value==="0"){
            validation=false
        }
        if(typeRef.current.value===""){
            validation=false
        }

        if(validation){
            setUpdateTour({
                "title": titleRef.current.value,
                "description": descriptionRef.current.value,
                "location": locationsRef.current.value,
                "type": typeRef.current.value
        })
            navigate('/admin', { replace: true });
        } else {             
            alert("Du är inte klar");
        }
    }

    return (
        <form >
            <label>Titel</label>
            <input type="text" ref={titleRef}></input>
            <label>Beskrivning</label>
            <textarea ref={descriptionRef}/>
            <label>Antal platser</label>
            <select ref={locationsRef}>
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <label>Typ</label>
            <select ref={typeRef}>
                <option value="">-</option>
                <option value="quiz">Quiz</option>
                <option value="infotour">Inforunda</option>
            </select>
            <h1 onClick={event => handleSave(event)}>Spara</h1>
        </form>
    )
}
