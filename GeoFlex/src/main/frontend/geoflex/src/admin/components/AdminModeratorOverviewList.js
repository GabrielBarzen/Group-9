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

    /**
 * Deletes a moderator.
 */
    function handleDeleteModerator() {
        props.deleteModerator(props.data["user-id"])
    }

    return (<>

        <li className='collection-item row'>

            <i className="material-icons col s1">person</i>
            <Link className="left" style={{ cursor: 'pointer', 'fontSize': '1rem', 'color': 'black' }} to={url} state={{ data: props.data }}>
                {props.data.name}
            </Link>
            <span className='col s1 right' style={{ cursor: 'pointer', 'fontSize': '2rem' }}><i className='material-icons right black-text' id={props.data["user-id"]} onClick={handleDeleteModerator}>delete_forever</i></span>

        </li>

    </>
    )
}

/*
{[...selectItems].map((item) => (<AdminModAssignRoutes
                            key={item.id}
                            selectItem={item} />
                        ))}



                        {[...selectItems].map((item) => (<AdminModAssignRoutes
                                key={item.id}
                                selectItem={item} />
                            ))}


                            <div onClick={handleSelectOptions} >{props.data.name}</div>
            
*/