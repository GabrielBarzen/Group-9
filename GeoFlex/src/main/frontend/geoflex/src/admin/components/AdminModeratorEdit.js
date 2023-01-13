import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import AdminModRoutes from './AdminModRoutes';
import AdminModAssignRoutes from './AdminModAssignRoutes';
import M from 'materialize-css';

export default function AdminModeratorEdit() {
    /**
     * functional component to handle administration of moderators
     * allowing admin to assign and remove routes from moderators
     */
    const [moderatorRoutes, setModeratorRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [status, setStatus] = useState(false);


    const location = useLocation();


    const moderator = location.state.data;

    const handleSelectOptions = () => {
        /**
         * function to handle the available routes to assign to a moderator
         */
        var leftUsers = allRoutes.filter(u => moderatorRoutes.findIndex(lu => lu.id === u.id) === -1);

        setSelectItems(leftUsers)
        if (!status) {
            setStatus(true);
        } else if (status) {
            setStatus(false);
        }

    }
    useEffect(() => {
        M.AutoInit();
        
        function getRouteForUser() {
        
            var config = {
                method: 'get',
                url: '/admin/route/user?user-id=' + moderator["user-id"],
                headers: {
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setModeratorRoutes(response.data["routes-for-user"]);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        function getAllRoutes() {
            var config = {
                method: "get",
                url: "/admin/routes",
                headers: {},
            };

            axios(config)
                .then(function (response) {
                    setAllRoutes(response.data);
                })
                .catch(function (error) {
                    console.log(error);

                });
        }

        getRouteForUser();
        getAllRoutes();
    }, [status, moderator])

    function assignRouteToMod(routeID, moderatorID) {
        var data = JSON.stringify(
            {
                "user-id": moderatorID,
                "access-level": 1,
                "route": [
                    {
                        "assign": routeID
                    }
                ]
            }
        )

        var config = {
            method: 'patch',
            url: '/admin/route/moderator',
            headers: {
                'Content-Type': 'text/plain',
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
            });
    }

    function unassignRouteFromMod(routeID, moderatorID) {
        var data = JSON.stringify(
            {
                "user-id": moderatorID,
                "access-level": 1,
                "route": [
                    {
                        "un-assign": routeID
                    }
                ]
            }
        )

        var config = {
            method: 'patch',
            url: '/admin/route/moderator',
            headers: {
                'Content-Type': 'text/plain',
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
            });
    }


    return (<>
        <div className='container white container-css'>
            <div className='row'>
                <div className='col s12'>
                    <h5 className="center align">Redigering av moderator: {moderator.name}</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col s11 offset-s1'>
                    <i>Nedanför listas rundor som {moderator.name} modererar.
                        Här kan du tilldela en rutt eller ta bort en befintlig rutt
                        från {moderator.name}.</i>
                </div>
                <div className='row'>
                    <div className="divider col s10 offset-s1" style={{ 'marginTop': '1rem' }}></div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <ul>
                            {[...moderatorRoutes].map((route) => (

                                <AdminModRoutes
                                    key={route.id}
                                    moderator={moderator}
                                    unassignRouteFromMod={unassignRouteFromMod}
                                    route={route} />
                            ))}
                        </ul>
                        <ul className="collapsible col m10 offset-s1 offset-m1">
                            <li>
                                <div className="collapsible-header" onClick={handleSelectOptions}>Klicka här för att tilldela rutt</div>
                                <div className="collapsible-body">{[...selectItems].map((item) => (<AdminModAssignRoutes
                                    key={item.id}
                                    selectItem={item}
                                    moderatorID={moderator["user-id"]}
                                    assignRouteToMod={assignRouteToMod}
                                />
                                ))}</div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <Link to={"/admin/moderator/overview"} style={{ cursor: 'pointer', 'fontSize': '1rem', 'color': 'black' }}>
                <div className='row'>
                    <div className='col s9 m8 l2'>
                        <i className="material-icons col s1 left">
                            keyboard_backspace
                        </i> Gå tillbaka
                    </div>
                </div>
            </Link>
        </div>
    </>
    )
}
