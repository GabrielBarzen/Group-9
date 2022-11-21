import React, { useEffect } from 'react';
import AdminModRoutes from './AdminModRoutes';
import M from 'materialize-css';

export default function (props) {
  const routeData = props.routeData;
  console.log("här" + props.data.name)

  useEffect(() => {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {});
    });

  return (<>
    <li>
      <div className="collapsible-header">{props.data.name}</div>
      <div className="collapsible-body">
        <ul>
          {[...routeData['routes-for-user']].map((route) => (
            <AdminModRoutes key={routeData['routes-for-user'].id} data={route} />
          ))}
        </ul>
        dropdown här
        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>


        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li className="divider" tabindex="-1"></li>
          <li><a href="#!">three</a></li>
          <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
          <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
        </ul>
      </div>
    </li>
  </>
  )
}
