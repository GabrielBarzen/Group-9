import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './GeoFlexSmall.png'


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
        <nav>
        <img src={logo} alt='logo' />
        </nav>
            <Outlet />
            <nav>
                <img src='GeoFlexSmall.png' alt='logo' />
                
            </nav>
            <ul>
                <li><Link to="/">Start</Link></li>
                <li><Link to="/moderator">Mod</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/admin/overview">Admin Översikt </Link></li>
                <li><Link to="/admin/new/">Admin lägg till </Link></li>
                <li><Link to="/admin/moderator/overview">Admin moderator admin </Link> </li>
                <button onClick={login}>logga in</button>
                <li><Link to="/game/start">User Starta quiz</Link></li>
                <li><Link to="/game/:id/welcome">User Quiz Välkomstskärm</Link></li>
                <li><Link to="/game/:id/navigation">User Quiz Vägbeskrivning</Link></li>
                <li><Link to="/game/:id/item">User Quiz Fråga</Link></li>
                <li><Link to="/game/:id/finish">User Quiz FÄRDIG</Link></li>
                
                             
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
