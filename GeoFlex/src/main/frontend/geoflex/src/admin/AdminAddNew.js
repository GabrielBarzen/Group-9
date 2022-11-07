import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function AdminAddNew() {

    const titleRef = useRef();
    const descriptionRef = useRef();
    /*
    const locationsRef = useRef();
    const typeRef = useRef();
    */
    const locationsRef = 5;
    const typeRef = "INFO"
    const navigate = useNavigate();

    function handleAddNew() {
       var data = JSON.stringify({
                   "route": {
                     "title": titleRef.current.value,
                     "description": descriptionRef.current.value,
                     "type": "QUIZ",
                     "locations": 10
                   }
                 });

               console.log(data)

               var config = {
                 method: 'post',
                 url: '/admin/route/',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 data : data
               };

               axios(config)
               .then(function (response) {
                 console.log(JSON.stringify(response.data));
               })
               .catch(function (error) {
                 console.log(error.response.data);
               });
    }

    const handleSave = () => {
        /*
        console.log(titleRef.current.value);
        console.log(descriptionRef.current.value);
        console.log(locationsRef.current.value);
        console.log(typeRef.current.value);
       

        let validation = true;
        if (titleRef.current.value === "") {
            validation = false;
        }
        if (descriptionRef.current.value === "") {
            validation = false
        }
        if (locationsRef.current.value === "0") {
            validation = false
        }
        if (typeRef.current.value === "") {
            validation = false
        }
        */
        let validation = true;

        if (titleRef.current.value === "") {
            validation = false;
        }
        if (descriptionRef.current.value === "") {
            validation = false
        }

        if (validation) {
            let content = JSON.stringify({
                "route": {
                    "title": titleRef.current.value,
                    "description": descriptionRef.current.value,
                    "location": locationsRef,
                    "type": typeRef
                }
            });
            console.log(content)

            handleAddNew();
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
            <textarea ref={descriptionRef} />
            <label>Antal platser</label>
            <select >
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <label>Typ</label>
            <select >
                <option value="">-</option>
                <option value="quiz">Quiz</option>
                <option value="infotour">Inforunda</option>
            </select>
            <h1 onClick={() => handleSave()}>Spara</h1>
        </form>
    )
}
