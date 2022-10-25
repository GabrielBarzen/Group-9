import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';


const loginURL = 'http://127.0.0.1:8080/authenticator/login'

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
                <h2 onClick={login}>logga in</h2>
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
