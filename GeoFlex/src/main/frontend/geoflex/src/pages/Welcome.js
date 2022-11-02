import React from 'react';
import QRImg from '../media/images/scan.png';
import "./style.css";

export default function Welcome() {
    return (
        <div className="welcomeBody">
            <ul className="btn-menu">    
                <li className="menu-btn"><a className="customBtn" href="/">Logga in</a></li>
                <li className="menu-btn"><a className="customBtn" href="/">Registrera</a></li>
                <li className="menu-btn"><a className="customBtn" href="/">Spela utan konto</a></li>
            </ul>
        </div>



    )
}