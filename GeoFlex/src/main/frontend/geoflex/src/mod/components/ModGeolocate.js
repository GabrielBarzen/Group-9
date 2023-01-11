import React from 'react'

export default function ModGeolocate(props) {

  function getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      props.handleGeoLocation(longitude, latitude)
    });
  }
  function onFieldChange(event) {
    /**
     * passing on the event to parent class method
     *  */
    props.handleInputChange(event);
  }
  return (
    <fieldset>
      <label>
        Longitud
        <input
          className='blue lighten-4'
          name="locationLongitude" type="text"
          value={props.data.locationLongitude}
          onChange={onFieldChange} />
      </label>
      <label>
        Latitud
        <input
          className='blue lighten-4'
          name="locationLatitude" type="text"
          value={props.data.locationLatitude}
          onChange={onFieldChange} />
      </label>
      <span className="button" onClick={getGeolocation}>Hämta koordinater</span>
    </fieldset>
  )
}