import React from 'react';
import QRImg from '../media/images/scan.png';
import "./style.css";

export default function Welcome() {
    return (
        <div class="welcomeBody">
            <ul class="btn-menu">    
                <li class="menu-btn"><a class="customBtn" href="/">Logga in</a></li>
                <li class="menu-btn"><a class="customBtn" href="/">Registrera</a></li>
                <li class="menu-btn"><a class="customBtn" href="/">Spela utan konto</a></li>
            </ul>
        </div>



    )
}