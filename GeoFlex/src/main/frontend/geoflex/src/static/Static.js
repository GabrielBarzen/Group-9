import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navbar from '../shared/Navbar'

const cookies = new Cookies();

export default function Static() {

  let status = cookies.get('role')
  let content;
  if (status === 'moderator') {
    content = <Navbar type={'mod'} />
  } else if (status === 'admin') {
    content = <Navbar type={'admin'} />
  } else {
    content = ""
  }

  const login = (() => {
    var data = JSON.stringify({
      "user-name": "exampleUser1",
      "password": "examplePassword1",
      "expiery": "WEEK"
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
          cookies.set('role', 'moderator', { path: '/', expires: new Date(Date.now()+86400)});
        });
    })
    return (
        <>
        <div className="row">
            {content}
            <Outlet />
        </div>    
            <ul>
                <li><Link className="white-text" to="/">Start</Link></li>
                <li><Link className="white-text" to="/moderator">Mod</Link></li>
                <li><Link className="white-text" to="/admin">Admin</Link></li>
                <li><Link className="white-text" to="/admin/overview">Admin Översikt </Link></li>
                <li><Link className="white-text" to="/admin/new/">Admin lägg till </Link></li>
                <li><Link className="white-text" to="/admin/moderator/overview">Admin moderator admin </Link> </li>
                <button onClick={login}>logga in</button>
                <li><Link className="white-text" to="/game/start">User Starta quiz</Link></li>
                <li><Link className="white-text" to="/game/:id/welcome">User Quiz Välkomstskärm</Link></li>
                <li><Link className="white-text" to="/game/:id/navigation">User Quiz Vägbeskrivning</Link></li>
                <li><Link className="white-text" to="/game/:id/item">User Quiz Fråga</Link></li>
                <li><Link className="white-text" to="/game/:id/finish">User Quiz FÄRDIG</Link></li>
                
                             
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
