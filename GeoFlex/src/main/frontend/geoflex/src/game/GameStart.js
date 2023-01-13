import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameTour from './GameTour';
import Cookies from 'universal-cookie';


export default function GameStart() {
    /**
     * functional component to render homescreen for user
     * GET API-call to fetch quizes the user has completed and maps them to GameTours component for render
     */
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();
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
            });
    }, [setTours]);    

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
