import React from 'react'
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className='row center-align'>
            <div className='container white container-css'>
                <h5>Vad är GeoFlex?</h5>
                <p>GeoFlex är en applikation som har utvecklats av en studentgrupp på Malmö Universitet.</p>
            </div>
            <div className='container white container-css'>
                <h5>Vem är vi?</h5>
                <p>Kontakt info:</p>
            </div>
            <div className='row center-align container'>
                <Link className='btn col s12 center-align waves-teal btn col btn-large btn-css icon-css z-depth-2' to="/">
                    Gå tillbaka
                </Link>
            </div>
        </div>
    )
}
