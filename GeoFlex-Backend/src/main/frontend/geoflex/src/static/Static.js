import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';


const loginURL = '/authenticator/login'

export default function Static() {

    const login = (() =>{
        axios.get(loginURL).then((response) => {
            console.log(response.data)
          });
    })
    return (
        <>
            <nav>
                <h1>GeoFlex</h1>
                <button onClick={login}>logga in</button>
            </nav>
                <ul>
                    <li><Link to="/">Start</Link></li>
                    <li><Link to="/mod">Mod</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/admin/overview">Admin Översikt </Link></li>
                </ul>
            <Outlet />
        </>
    )
}
