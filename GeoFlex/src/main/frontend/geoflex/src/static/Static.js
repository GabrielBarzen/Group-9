import React from 'react';
import { Outlet } from 'react-router-dom';

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
  return (
    <>
      <div className="row">
        {content}
        <Outlet />
      </div>
      <div className='row center-align'>
        <div className='container white container-css'>
        </div>
      </div>
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
