import React from 'react'
import { Link } from 'react-router-dom'
import AdminOverview from "../admin/AdminOverview"

export default function Admin() {

    return (
        <div>
            <AdminOverview />
            <ul>
                <li><Link to="/">Start</Link></li>
                <li><Link to="/mod">Mod</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </div>

    )

}
