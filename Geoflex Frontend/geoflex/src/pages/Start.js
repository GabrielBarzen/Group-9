import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {
    return (
        <div>
            <p>Start</p>
            <ul>
                <li><Link to="/">Start</Link></li>
                <li><Link to="/mod">Mod</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
    )
}
