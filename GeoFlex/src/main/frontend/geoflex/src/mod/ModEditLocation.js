import React from 'react';
import LocationForm from './components/LocationForm';
import axios from 'axios';

export default function ModEditLocation(props) {
  /**
   * ModEditLocation handles all API-calls needed to edit a location
   *  
   */

  function updateLocation(data) {
    /**
    *API call PATCH to update a location in the moderator edit view
    */
    var config = {
      method: "patch",
      url: "/moderator/location",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function addAnswer(id) {
    /**
     * API-call to add 1 answer 
     */
    var data = JSON.stringify(
      {
        "location-update": {
          "location-id": id,
          "name": "",
          "text_info": "",
          "qr": "",
          "x_coords": "",
          "y_coords": "",
          "directions": "",
          "content": [
            {
              "new": "1"
            }
          ]
        }
      },
    );

    var config = {
      method: "patch",
      url: "/moderator/location",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
                
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <LocationForm
        currentData={props.data}
        callUpdateLocation={updateLocation}
        callAddQuestion={addAnswer} />
    </>
  )
}