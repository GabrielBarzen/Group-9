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
    <fieldset style={{ 'border': '0px', 'margin': '0px', 'padding': '0px' }}>
      <label>
        Longitud
        <input
          className='grey lighten-3'
          name="locationLongitude" type="text"
          value={props.data.locationLongitude}
          onChange={onFieldChange} />
      </label>
      <label>
        Latitud
        <input
          className='grey lighten-3'
          name="locationLatitude" type="text"
          value={props.data.locationLatitude}
          onChange={onFieldChange} />
      </label>
      <a className="waves-effect waves-light btn grey darken-3" id="btn-small-screen" onClick={getGeolocation}>
        <i className="material-icons col s1" id="icon-small-screen">
          gps_fixed
        </i> Hämta koordinater</a>
    </fieldset>
  )
}