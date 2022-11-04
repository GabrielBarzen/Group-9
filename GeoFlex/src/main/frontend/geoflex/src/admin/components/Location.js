import React from 'react'
import Button from '../../shared/test/Button'

export default function Location(props) {
    return (
        <>
            <li className='row card-panel'>

                <i className="material-icons col s1">place</i>
                <span className='col s9'>
                    {props.data.name}
                </span>
                <button onClick={() => {props.deleteLocation(props.data.id)}}>
                    Ta bort
                </button>
            </li>
        </>
    )
}
