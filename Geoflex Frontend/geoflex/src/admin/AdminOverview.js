import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminAddNew from './AdminAddNew';

export default function AdminOverview() {
    const quiz = (()=>{
        axios
    });
    return (
        <section>
            <h2>Översikt</h2>
            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
            <Link to='/admin/new/'>
                <button id="add-new">Lägg till</button>
            </Link>
            <AdminAddNew />
        </section>
    )
}
