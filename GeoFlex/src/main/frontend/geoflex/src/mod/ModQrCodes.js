import React from 'react'
import { useLocation } from 'react-router-dom';
import ModQrCode from './ModQRCode';

export default function ModQrCodes() {
  const location = useLocation();
  const data = location.state.data;
  console.log("MODQRCODES")
  console.log(data)


  const questions = [];

  data.forEach(item => {
    const newObj = {};
    newObj.location_id = item.location_id;
    newObj.name = item.name;    
    questions.push(newObj);
  });



  return (<>
    <div>ModQrCodes</div>
    {[...questions].map((question) => (
                <ModQrCode key={question.location_id} data={question}/>
              ))}
    </>
  )
}
