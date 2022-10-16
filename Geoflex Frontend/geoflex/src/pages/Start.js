import React from 'react';
import QRImg from '../media/images/scan.png';

export default function Start() {
    return (
        <div>
            <p>Start</p>
            <form method="POST">
                <label>Ange kod</label>
                <input type="numbers" pattern="[0-9]*"/>
                <button>OK</button>
            </form>
            <img src={QRImg} alt='scan QR code'/>
        </div>
    )
}
