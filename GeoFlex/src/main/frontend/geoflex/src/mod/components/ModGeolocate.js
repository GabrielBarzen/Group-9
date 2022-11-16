import React from 'react'

export default function ModGeolocate(props) {

    function getGeolocation(){
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            props.handleGeoLocation(longitude, latitude)
          });
    }
  return (
    <span className="button" onClick={getGeolocation}>Hämta koordinater</span>
  )
}
