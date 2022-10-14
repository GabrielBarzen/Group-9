import React from 'react'
import { Link } from 'react-router-dom'

export default function Mod() {
    return (
        <div>
            <p>MOD</p>
            <ul>
                <li><Link to="/">Start</Link></li>
                <li><Link to="/mod">Mod</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
    )
}
