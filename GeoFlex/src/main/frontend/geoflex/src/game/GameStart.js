import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameTour from './GameTour'
import Cookies from 'universal-cookie';

export default function GameStart() {
    const [tours, setTours] = useState([]);
    const cookies = new Cookies();


    useEffect(() => {

        var config = {
            method: "get",
            url: "/user/routes",
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setTours(response.data);
            })
            .catch(function (error) {
                console.log(error);

                //Dev placeholderdata
                const placeholder = [{
                    "title": "T",
                    "description": "1",
                    "type": "QUIZ",
                    "id": "1552",
                    "code": "8196",
                    "media": [
                        {
                            "mediaUrl": "https://www.twitch.tv/odablock",
                            "mediaType": "video",
                            "externalMedia": true
                        }
                    ],
                    "locations": 3,
                    "timesFinished": "0"
                }, {
                    "title": "T",
                    "description": "1",
                    "type": "QUIZ",
                    "id": "1554",
                    "code": "8193",
                    "media": [
                        {
                            "mediaUrl": "",
                            "mediaType": "",
                            "externalMedia": false
                        }
                    ],
                    "locations": 3,
                    "timesFinished": "0"
                }];
                placeholder.reverse();
                setTours(placeholder);
            });
    }, [setTours]);

    const navigate = useNavigate();

    function navigateToStart() {
        navigate('/game/start', { replace: false });
    }

    function handleLogOut(){
        cookies.remove("role");
        cookies.remove("user-id");
        cookies.remove("authentication-token");
        navigate('/', { replace: true });
        window.location.reload(false);
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
                            <h5 className="center-align">Översikt användare</h5>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="collection">
                                {[...tours].map((tour) => (
                                    <GameTour key={tour.id} data={tour} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <Button text="Starta spel" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={navigateToStart} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <Button text="Logga ut" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={handleLogOut} />
                            </div>
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
                            <h5 className="center-align">Översikt användare</h5>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="collection">
                                <li>Du har inte deltagit i några quiz ännu. När du gjort det kommer de listas här</li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <Button text="Starta spel" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={navigateToStart} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <Button text="Logga ut" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>} click={handleLogOut} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
