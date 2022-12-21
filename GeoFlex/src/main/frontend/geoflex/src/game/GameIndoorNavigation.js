import React, { useState } from 'react';
import GameNavigation from './GameNavigation';

export default function GameIndoorNavigation(props) {

    const [QRScanner, setQRScanner] = useState(false);

    function setUserArrivedHelper(result){
      console.log("INDOORNAV")
      console.log(result)
      props.setUserArrived(result);
    }    

  return (
    <div>
        <GameNavigation currentQuestion={props.currentQuestion} QRScanner={QRScanner} setQRScanner={setQRScanner} setUserArrived={setUserArrivedHelper}/>
    </div>
  )
}
