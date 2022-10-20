import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminAddNew from './AdminAddNew';
import Tour from './components/Tour';

export default function AdminOverview() {
    const [tours, setTours] = useState([{
        "route":
        {
            "title": "Test Quiz1",
            "description": "This quiz is for testing purposes.",
            "type": "QUIZ",
            "id": "1",
            "code": "000001",
            "locations": 5
        }
    },
    {
        "route":
        {
            "title": "Test Quiz2",
            "description": "This quiz is for testing purposes.",
            "type": "QUIZ",
            "id": "2",
            "code": "000002",
            "locations": 10
        }
    }]);
    return (
        <section>
            <h2>Översikt</h2>
            {[...tours].map(tour => <Tour key={tour.route.id} data={tour.route} />)}            
            <Link to='/admin/new/'>
                <button id="add-new">Lägg till</button>
            </Link>
            <AdminAddNew />
        </section>
    )
}
/*
            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
*/