import React from 'react';

export default function AdminModRoutes(props) {

    function handleDelete() {
        //anrop till parent-komponent; tar bort en route från en moderator
        props.unassignRouteFromMod(props.route.id, props.moderator["user-id"]);
    }
    return (<>
        <li className='row'>
            <div className='row'>
                <div className='col s5 offset-s1'>
                    {props.route.title}
                </div>
                <div className='col l3 s5 m3 offset-s1 offset-m2 offset-l3'>
                    <a className="waves-effect waves-light btn-small  red lighten-1" onClick={handleDelete}>
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

