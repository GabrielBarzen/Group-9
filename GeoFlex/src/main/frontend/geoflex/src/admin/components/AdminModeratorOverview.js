import React from 'react';

export default function (props) {
    console.log("här" + props.data.name)
  return (<>    
    <li>
    <div class="collapsible-header">{props.data.name}</div>
    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>  
  </>
  )
}
