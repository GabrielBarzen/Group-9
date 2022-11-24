import React, { useEffect, useState } from 'react';
import AdminModeratorOverview from './components/AdminModeratorOverview';
import M from 'materialize-css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '../shared/Button';


export default function AdminModeratorEdit() {
    const [moderators, setModerators] = useState([]);
    const [moderatorRoutes, setModeratorRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);

    const dummyModerators = [{ "name": "Max", "user-id": 78 }, { "name": "Jack", "user-id": 79 }, { "name": "Lux", "user-id": 80 }, { "name": "Sivir", "user-id": 81 }];

    var assignedRouteExample = {
        "routes-for-user": [
            {
                "code": 6960,
                "description": "Postman edit test",
                "locations": 17,
                "id": 96,
                "title": "Spongebob Squarepants",
                "type": "INFO"
            },
            {
                "code": 10501,
                "description": "Quiz om Malmö",
                "locations": 5,
                "id": 97,
                "title": "Malmö",
                "type": "QUIZ"
            }
        ]
    };

    //dummmy-data över alla tillgängliga quiz
    const dummyData = [{ "title": "Test Quiz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "1", "code": "572748", "locations": 3 }, { "title": "Test Info", "description": "This info for testing purposes.", "type": "INFO", "id": "2", "code": "184471", "locations": 3 }, { "title": "Test 2", "description": "More testing tests ", "type": "INFO", "id": "4", "code": "295052", "locations": 0 }, { "title": "Num Location Test1", "description": "test, remove", "type": "INFO", "id": "5", "code": "447827", "locations": 0 }, { "title": "Num Location Test2", "description": "test, remove", "type": "INFO", "id": "6", "code": "625158", "locations": 3 }, { "title": "Num Location Test3", "description": "test, remove", "type": "INFO", "id": "7", "code": "782310", "locations": 4 }, { "title": "Test Quiz2E", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "8", "code": "538027", "locations": 6 }, { "title": "Test Quizz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "10", "code": "983850", "locations": 6 }];


    useEffect(() => {
        M.AutoInit();
        getModeratorList();
        getAllRoutes();
    }, []);

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

                //Dev placeholderdata
                setAllRoutes(dummyData);

            });
    }

    /**
     * Hämtar en lista av alla moderatorer.
     */
    function getModeratorList() {
        console.log("GET MODERATOR LIST");

        var config = {
            method: 'get',
            url: '/admin/moderators',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setModerators(response.data.moderators);
            })
            .catch(function (error) {
                console.log(error);
                //dummy data som ska tas bort:
                console.log("MODERATOR ERROR");
                setModerators(dummyModerators);
            });

    }

    /**
     * Hämtar alla quiz en moderator har blivit tilldelad med hjälp av dens ID.
     * Bara id 81 har quizzes atm.
     */

    function getRouteForUser(id) {
        console.log("MOD ID: " + id);
        var config = {
            method: 'get',
            url: '/admin/route/user?user-id=' + id,
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
                //dummy data som ska tas bort:
                console.log("MODERATOR ROUTES DUMMY DATA");
                setModeratorRoutes(assignedRouteExample["routes-for-user"]);
            });

    }

    return (<>
        <div className='container white container-css'>
            <div className="row center-align">
                <div className="col s12">
                    <h2 className="center align">Översikt på moderatorer</h2>
                    <ul className='collapsible'>
                        {[...moderators].map((moderator) => (
                            <AdminModeratorOverview
                                key={moderator['user-id']}
                                getRouteForUser={getRouteForUser}
                                data={moderator}
                                moderatorRoutesData={moderatorRoutes}
                                allRoutesData={allRoutes}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="center-align">
                    <Link to="/admin/create-moderator">
                        <Button css=" s12 green lighten-1 "

                            icon={<i className="material-icons white-text">
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
