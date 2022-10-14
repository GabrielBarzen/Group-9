import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Static() {
    return (
        <>
            <nav>
                <h1>GeoFlex</h1>
            </nav>
            <Outlet />
        </>
    )
}
