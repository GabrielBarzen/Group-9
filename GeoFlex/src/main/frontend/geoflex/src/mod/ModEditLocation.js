import React from 'react';
import LocationForm from './components/LocationForm';
import axios from 'axios';

export default function ModEditLocation(props) {

  /**
   * ModEditLocation handles all API-calls needed to edit a location
   *  
   */
  console.log("EDITLOCATION")


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

  function addAnswer(locationID) {
    /**
     * API-call to add 1 answer 
     */
    console.log("ADDANSWER")
    console.log(locationID)
    var data = JSON.stringify(
      {
        "location-update": {
          "location_id": locationID,
          "name": "",
          "text_info": "",
          "location_index": "",
          "last_location": "",
          "x_coords": "",
          "y_coords": "",
          "directions": "",
          "content": [
            {
              "id": null
            }
          ],
          "media": [
            {
              "mediaURL": "",
              "mediaType": ""
            }
          ]
        }
      }
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
        console.log(error.response.data);
      });
  }

  function removeAnswer(locationID, contentID) {
    /**
     * API-call to remove 1 answer 
     */
    console.log("REMOVE ANSWER");
    console.log(contentID)
    var data = JSON.stringify(
      {
        "location-update": {
          "location-id": locationID,
          "name": "",
          "text_info": "",
          "media": [{
            "mediaURL": "",
            "mediaType": ""
          }],
          "qr": "",
          "x_coords": "0.0",
          "y_coords": "0.0",
          "directions": "",
          "content": [{
            "delete": contentID
          }]
        }
      }
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
        locationContent={props.locationContent}
        callUpdateLocation={updateLocation}
        callAddAnswer={addAnswer}
        callRemoveAnswer={removeAnswer}
      />
    </>
  )
}


