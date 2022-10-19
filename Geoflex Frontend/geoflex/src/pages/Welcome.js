import React from 'react';
import QRImg from '../media/images/scan.png';
import "./style.css";

export default function Welcome() {
    return (
        <div>
            <h3 class="welch3">Välkommen till GeoFlex</h3>
            <ul class="btn-menu">
                        
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Logga in</a></li>
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Registrera</a></li>
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Spela utan konto</a></li>
            </ul>
        </div>
    )
}