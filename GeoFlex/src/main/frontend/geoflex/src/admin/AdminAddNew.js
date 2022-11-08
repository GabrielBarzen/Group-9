import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from 'materialize-css';

export default function AdminAddNew() {
    const titleRef = useRef();
    const descriptionRef = useRef();
    /*
      const locationsRef = useRef();
      const typeRef = useRef();
      */
    const locationsRef = 5;
    const typeRef = "INFO";
    const navigate = useNavigate();

    function handleAddNew() {
        var data = JSON.stringify({
            route: {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                type: "QUIZ",
                locations: 10,
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
            validation = false;
        }

        if (validation) {
            let content = JSON.stringify({
                route: {
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    location: locationsRef,
                    type: typeRef,
                },
            });
            console.log(content);

            handleAddNew();
            navigate("/admin", { replace: true });
        } else {
            alert("Du är inte klar");
        }
    };

    useEffect(() => {
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
                        <form action="#">
                            <p className="range-field">
                                <p>Antal platser</p>
                                <input type="range" id="test5" min="0" max="20" />
                            </p>
                        </form>
                    </div>
                    <div className="row">
                        <h1 className="center-align" onClick={() => handleSave()}>
                            Spara
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    );
}
