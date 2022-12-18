import React, { useState } from 'react';
import GameNavigation from './GameNavigation';

export default function GameIndoorNavigation() {

    const [QRScanner, setQRScanner] = useState(false);
    

  return (
    <div>
        <GameNavigation setQRScanner={setQRScanner}/>
    </div>
  )
}
