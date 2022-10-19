import React from 'react';
import { Outlet, Link } from 'react-router-dom';


export default function Static() {
    return (
        <>
            <nav>
                <h1>GeoFlex</h1>
            </nav>
                <ul>
                    <li><Link to="/">Start</Link></li>
                    <li><Link to="/mod">Mod</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            <Outlet />
        </>
    )
}
