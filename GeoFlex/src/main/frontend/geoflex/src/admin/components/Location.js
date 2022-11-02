import React from 'react'

export default function Location(props) {
    return (
        <>
            <li className='input-field'>
                <div className="collapsible-header"><i className="material-icons">place</i>{props.data.name}</div>
                <div className="collapsible-body"><input type="text" id={'text-info-'+props.data.location_index} defaultValue={props.data.text_info}/>
          <label htmlFor={'text-info-'+props.data.location_index}>Last Name</label></div>
            </li>
        </>
    )
}
