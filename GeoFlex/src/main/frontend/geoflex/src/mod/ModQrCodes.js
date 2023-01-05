import React from 'react'
import { useLocation } from 'react-router-dom';
import ModQrCode from './ModQRCode';
import { Link } from 'react-router-dom';

export default function ModQrCodes() {
  const location = useLocation();
  const data = location.state.data;
  console.log("MODQRCODES")



  const questions = [];

  data.forEach(item => {
    if (item.last_location !== "true") {
      const newObj = {};
      newObj.location_id = item.location_id;
      console.log(item.location_id)
      newObj.name = item.name;
      questions.push(newObj);
    }
  });

  console.log("DET HÄR ÄR" + data.location)




  return (<>
    <div className='row'>
      <div className='container white container-css'>

        {[...questions].map((question) => (

          <ModQrCode key={question.location_id} data={question} />
        ))}


        <div className='row'>
          <a href="javascript:history.back()" style={{ 'color': 'black' }}>
            <div className='col s9 m8 l2'>
              <i className="material-icons col s1 left">
                keyboard_backspace
              </i> Gå tillbaka
            </div>
          </a>
        </div>



      </div>
    </div>







  </>
  )
}
