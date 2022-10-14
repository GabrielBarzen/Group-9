import React from 'react'

export default function AdminOverview() {
    return (
        <section>
            <h2>Översikt</h2>
            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
            <button id="add-new">Lägg till</button>
        </section>
    )
}
