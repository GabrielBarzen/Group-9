import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from 'materialize-css';

export default function AdminAddNew() {
    /*
    AdminAddNew adds a single new tour 
    React useRef listen on input and stores the information to its assigned variable
    navigate is part of react-router-dom and lets you redirect to a specific URL when called like this: " navigate("/admin", { replace: true }); "
    */
    const titleRef = useRef();
    const descriptionRef = useRef();
    const rangeRef = useRef();

    const navigate = useNavigate();

    function handleAddNew() {
        console.log("ADD NEW ROUTE")
        /*
        API call POST to send the new route-object to DB 
        */
        var data = JSON.stringify({
            'route': {
                'title': titleRef.current.value,
                'description': descriptionRef.current.value,
                'type': "QUIZ",
                'locations': rangeRef.current.value,
            },
        });

        console.log(data);

        var config = {
            method: "post",
            url: "/admin/route/",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                navigate("/admin", { replace: true });
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    useEffect(() => {
        //useEffect to initialize M from material css framework every time the page load
        M.AutoInit();
    }, []);

    return (
        <div className="container white container-css">
            <h2 className="center-align">Skapa nytt</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">label</i>
                            <input id="title" type="text" ref={titleRef} />
                            <label htmlfor="title">Titel</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea
                                type="text"
                                className="materialize-textarea"
                                id="description"
                                ref={descriptionRef}
                            />
                            <label htmlfor="description">Beskrivning</label>
                        </div>
                    </div>
                    <div className="row">
                        
                            <p className="range-field">
                                <p>Antal platser</p>
                                <input type="range" id="test5" min="0" max="20" ref={rangeRef}/>
                            </p>
                        
                    </div>
                    <div className="row">
                        <h1 className="center-align" onClick={handleAddNew}>
                            Spara
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    );
}
