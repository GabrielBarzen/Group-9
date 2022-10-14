import React from 'react'

export default function () {
  return (
    <fieldset>
        <form method='POST'>
            <label>Användarnamn</label>
            <input type="text"/>
            <label>Lösenord</label>
            <input type="text"/>
            <button>Logga in</button>
        </form>
    </fieldset>
  )
}
