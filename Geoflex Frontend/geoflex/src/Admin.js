import React, { useState } from 'react'
import AdminOverview from './AdminOverview';
import Login from './components/Login'

export default function Admin() {
    const [status, setStatus] = useState(true);
  
  if(!status){
    return (
        <div><Login/></div>
      )
  } else if(status){
    return (<div>
        <AdminOverview/>
    </div>)
  }
}
