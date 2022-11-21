import React, { useEffect, useState } from 'react';
import AdminModeratorOverview from './components/AdminModeratorOverview';
import M from 'materialize-css';


export default function AdminModeratorEdit() {
    const [moderators, setModerators] = useState([
        {
        "name":"NewModerator",
        "user-id":69
        },
        {
        "name":"Max",
        "user-id":78
        },
        {
        "name":"Jack",
        "user-id":79
        },
        {
        "name":"Lux",
        "user-id":80
        },
        {
        "name":"Sivir",
        "user-id":81
        }
        ]
        );

    useEffect(() =>{
        M.AutoInit();
        moderator();
    });

    function moderator(){
        axios

        setModerators(response.data.moderators)
    }

    return (<>
    <div className='white'>
    <p>Översikt på moderatorer</p>
    <ul className='collapsible'>
        {[...moderators].map((moderator) => (
            <AdminModeratorOverview key={moderator['user-id']} data={moderator} />
        ))}
    </ul>
    </div>
    </>
    )
}
