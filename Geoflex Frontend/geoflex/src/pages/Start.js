import React from 'react';
import QRImg from '../media/images/scan.png';
import "./style.css";

export default function Start() {
    return (
        <div>
            <ul class="btn-menu">
                        
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Logga in</a></li>
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Registrera</a></li>
                <li class="menu-btn"><a class="waves-effect waves-light btn" href="/">Spela utan konto</a></li>
            </ul>

            <p>Start</p>
            <form method="POST">
                <label>Ange kod</label>
                <input type="numbers" pattern="[0-9]*"/>
                <input type="submit" value="OK"/>
            </form>
            <img src={QRImg} alt='scan QR code'/>
        </div>
    )
}
