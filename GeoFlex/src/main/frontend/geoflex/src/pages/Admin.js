import React from 'react'
import AdminOverview from "../admin/AdminOverview"
import Navbar from '../shared/Navbar'

export default function Admin() {
    /*
    main outlet for the admin-related pages
    */

    return (
        <div>
            <Navbar type={'admin'} />
            <AdminOverview />
        </div>

    )

}
