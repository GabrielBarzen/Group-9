import React from 'react'

export default function AdminAddNew() {
    return (
        <form method="POST">
            <label>Titel</label>
            <input type="text"></input>
            <label>Antal platser</label>
            <select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <label>Typ</label>
            <select>
                <option value="quiz">Quiz</option>
                <option value="infotour">Inforunda</option>
                <option value="mixed">Blandat</option>
            </select>
            <button>Nästa</button>
        </form>
    )
}
