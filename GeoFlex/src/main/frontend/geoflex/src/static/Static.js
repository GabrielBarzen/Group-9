import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';


const loginURL = '/authenticator/login'

export default function Static() {

    const login = (() => {
        var data = JSON.stringify({
            "user-name": "exampleUser1",
            "password": "examplePassword1",
            "expiery":"WEEK"
          });

        var config = {
          method: 'post',
          url: '/authenticator/login',
          headers: { 
            'Content-Type': 'text/plain'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    return (
        <>
            <Outlet />
            <nav>
                <h1>GeoFlex</h1>
                <button onClick={login}>logga in</button>
            </nav>
            <ul>
                <li><Link to="/">Start</Link></li>
                <li><Link to="/moderator">Mod</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/admin/overview">Admin Översikt </Link></li>
                <li><Link to="/admin/new/">Admin lägg till </Link></li>
                <li><Link to="/admin/moderator-management">Admin moderator admin </Link> </li>
                <li><Link to="/mod/overview">Moderator Översikt </Link></li>                
            </ul>
        </>
    )
}

/*

<nav>
                <h1>GeoFlex</h1>
                <button onClick={login}>logga in</button>
            </nav>
                <ul>
                    <li><Link to="/">Start</Link></li>
                    <li><Link to="/mod">Mod</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/admin/overview">Admin Översikt </Link></li>
                    <li><Link to="/admin/new/">Admin lägg till </Link></li>                    
                </ul>

*/
