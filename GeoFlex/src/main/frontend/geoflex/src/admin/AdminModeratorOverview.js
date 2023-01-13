import React, { useEffect, useState } from 'react';
import AdminModeratorOverviewList from './components/AdminModeratorOverviewList';
import M from 'materialize-css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

export default function AdminModeratorOverview() {
    const [moderators, setModerators] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        M.AutoInit();

        /**
         * GET API-anrop för att hämta en lista på alla moderatorer
         */
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
            });

    }, [status]);

    function deleteModerator(ModID) {
        /**
         * POST API-anrop för att ta bort en moderator
         */
        var config = {
            method: 'post',
            url: '/admin/delete/moderator?user-id=' + ModID,
            headers: {}
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
            <div className="row center-align">
                <div className="col s12">
                    <h5 className="center align">Översikt på moderatorer</h5>

                    <i>Klicka på den moderatorn du vill redigera</i>
                    <br />
                    <ul>
                        {[...moderators].map((moderator) => (
                            <AdminModeratorOverviewList
                                key={moderator["user-id"]}
                                data={moderator}
                                deleteModerator={deleteModerator}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="center-align">
                    <Link to="/admin/moderator/create">
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
