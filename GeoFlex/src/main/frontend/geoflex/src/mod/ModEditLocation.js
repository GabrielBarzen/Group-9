import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationForm from './components/LocationForm';

export default function ModEditLocation(props) {
  const navigate = useNavigate();

  //location recieves data from Link
  const location = useLocation();
  const routeData = location.state.route;
  const defaultValues = location.state.data;


    console.log("MOD EDIT LOCATION. routeID; " + routeData + " defaultValues: " + defaultValues)
    for (const [key, value] of Object.entries(defaultValues)) {
      console.log(`${key}: ${value}`);
    }
    

  return (
    <div className='container white'>
      <LocationForm defaultValues={defaultValues} />
    </div>
  )
}