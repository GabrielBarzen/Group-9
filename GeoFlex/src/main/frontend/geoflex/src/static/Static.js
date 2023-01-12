import React from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../shared/Navbar';

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
    </>
  )
}