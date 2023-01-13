import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tour from "./components/Tour";
import Button from "../shared/Button";
import axios from "axios";

export default function AdminOverview() {
    const [tours, setTours] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        /*
        useEffect renders every first load of the page and then every time the state of "status" changes.
        API call GET an overview-object of all tours (quiz or infotour) and changes the state of the "tours"-variable to contain the response object.
        */
        var config = {
            method: "get",
            url: "/moderator/routes",
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setTours(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [status]);

    function deleteItem(id) {
        /*
        API call DELETE to remove a single tour based on its ID
        */
        var config = {
            method: "delete",
            url: "/admin/route?route-id=" + id,
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                //if response is ok 200 switch state of status to trigger useEffect to show an updated object
                if (!status) {
                    setStatus(true);
                } else if (status) {
                    setStatus(false);
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    if (tours.length !== 0) {
        /*
        if: tours is populated we render the jsx HTML passing each tour into Tour.js along with all its data and the DELETE function.
        else: a loading circle will render while waiting for tours to be populated
        */
        return (
            <>
                <div className="container white container-css">
                    <div className="row">
                        <div className="col s12">
                            <h5 className="center align">Översikt</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="collection">
                                {[...tours].map((tour) => (
                                    <Tour key={tour.id} data={tour} deleteItem={deleteItem} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center-align">
                            <Link to="/admin/new/">
                                <Button
                                    css=" s12 green lighten-1"
                                    icon={
                                        <i className="material-icons black-text">
                                            add_circle_outline
                                        </i>
                                    }
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="container white container-css">
                    <div className="row">
                        <div className="col s12">
                            <h5 className="center align">Översikt</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <section className="container center-align">
                                <div className="preloader-wrapper big active">
                                    <div className="spinner-layer spinner-red-only">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div>
                                        <div className="gap-patch">
                                            <div className="circle"></div>
                                        </div>
                                        <div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center-align">
                            <Link to="/admin/new/">
                                <Button
                                    css=" s12 green lighten-1"
                                    icon={
                                        <i className="material-icons black-text">
                                            add_circle_outline
                                        </i>
                                    }
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}