import React, { useEffect } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminModeratorOverviewList(props) {

    let url = "/admin/moderator/edit/" + props.data["user-id"];

    useEffect(() => {
        M.AutoInit();
        console.log(props.data.name)
    }, []);

    function handleDeleteModerator() {
        /**
        * Deletes a moderator.
        */
        props.deleteModerator(props.data["user-id"])
    }

    return (<>

        <li className='collection-item row'>
            <div className='row'>
                <div className='col s1 offset-s1'>
                    <i className="material-icons col s1">person</i>
                </div>
                <div className='col s3 offset-s1'>
                    <Link className="left" style={{ cursor: 'pointer', 'fontSize': '1rem', 'color': 'black' }} to={url} state={{ data: props.data }}>
                        {props.data.name}
                    </Link>
                </div>
                <div className='col s5'>
                    <a className="waves-effect waves-light btn  red lighten-1 btn-small right" id={props.data["user-id"]} onClick={handleDeleteModerator}>
                        <i className="material-icons col s1" id="icon-small-screen">
                            delete_forever
                        </i> Radera</a>
                </div>
            </div>
            <div className='row'>
                <div className="divider col s10 offset-s1"></div>
            </div>
        </li>

    </>
    )
}