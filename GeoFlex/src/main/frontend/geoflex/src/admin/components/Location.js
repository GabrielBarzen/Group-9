import React from 'react'

export default function Location(props) {
    return (
        <>
            <li className='row'>
                <div className="card-panel"><i className="material-icons">place</i>{props.data.name}</div>
                <div className=""></div>
            </li>
        </>
    )
}
