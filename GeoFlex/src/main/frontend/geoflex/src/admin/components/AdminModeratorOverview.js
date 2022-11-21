import React, { useEffect, useState } from 'react';
import AdminModRoutes from './AdminModRoutes';
import AdminModAssignRoutes from './AdminModAssignRoutes';
import M from 'materialize-css';

export default function AdminModeratorOverview(props) {
    const [selectItems, setselectItems] = useState(null);
    const routeData = props.moderatorRoutesData;
    console.log("här" + props.data.name)

    const handleSelectOptions = () => {

        let allRoutes = props.allRoutesData;
        let availableRoutes = [];
        allRoutes.forEach(element => {
            routeData.forEach(item => {
                if (item.id !== element.id) {
                    availableRoutes.push(element)
                }
            })
        });
        setselectItems(availableRoutes);
    }


    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, {});
        });
    });

    const handleModeratorRoutes = () => {
        props.getRouteForUser(props.data.id)
    }

    if (routeData.length !== 0) {
        return (<>
            <li>
                <div className="collapsible-header" onClick={handleModeratorRoutes}>{props.data.name}</div>
                <div className="collapsible-body">
                    <ul>
                        {[...routeData['routes-for-user']].map((route) => (
                            <AdminModRoutes key={routeData['routes-for-user'].id} data={route} />
                        ))}
                    </ul>
                    <div onClick={handleSelectOptions} class="input-field col s12">
                        <select>
                            <option value="" disabled selected>Choose your option</option>
                            {[...selectItems].map((item) => (<AdminModAssignRoutes 
                            key={item.id}
                            selectItem={item}/>
                            ))}
                        </select>
                        <label>Tilldela till Moderator</label>
                    </div>
                </div>
            </li>
        </>
        )
    } else {
        return (
            <>
                <p>Laddar</p>
            </>
        )
    }
}
