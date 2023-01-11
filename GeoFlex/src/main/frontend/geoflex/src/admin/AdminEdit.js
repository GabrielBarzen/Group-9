import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminEditForms from "./components/AdminEditForms";


export default function AdminEdit() {
  /** 
  *AdminEdit.js allows the administrator to edit a single route.
  *navigate is part of react-router-dom and lets you redirect to a specific URL when called like this: " navigate("/admin", { replace: true }); "
  *location is part of react-router-dom and allows you to recieve any data sent from previous location/URL from a Link
  */
  const navigate = useNavigate();

  //location recieves data from Link
  const location = useLocation();
  const routeData = location.state.data;

  const [routeLocationsData, setRouteLocationsData] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    /**
    *useEffect renders every first load of the page and then every time the state of "status" changes. routeData.id is also included at the en as a dependency
    *API call GET to receive all locations bound to a specific tour ID
    */
    console.log(status);
    console.log("EDIT USEEFFECT");
    var config = {
      method: "get",
      url: "/admin/route/locations?route-id=" + routeData.id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        //Moves the last_location: true-object to the end of the array.
        response.data.route.location.push(response.data.route.location.shift());
        setRouteLocationsData(response.data);
      })
      .catch(function (error) {
        console.log(error);
        //dev placeholder data
        setRouteLocationsData({ "route": { "location": [{ "name": "1", "text_info": "Replace me", "id": "988", "location_index": "1", "last_location": "false" }, { "name": "2", "text_info": "Replace me", "id": "989", "location_index": "2", "last_location": "false" }, { "name": "3", "text_info": "Replace me", "id": "990", "location_index": "3", "last_location": "false" }, { "name": "4", "text_info": "Replace me", "id": "991", "location_index": "4", "last_location": "false" }, { "name": "5", "text_info": "Replace me", "id": "992", "location_index": "5", "last_location": "false" }, { "name": "6", "text_info": "Replace me", "id": "993", "location_index": "6", "last_location": "false" }, { "name": "7", "text_info": "Replace me", "id": "994", "location_index": "7", "last_location": "false" }, { "name": "8", "text_info": "Replace me", "id": "995", "location_index": "8", "last_location": "false" }, { "name": "9", "text_info": "Replace me", "id": "996", "location_index": "9", "last_location": "false" }, { "name": "10", "text_info": "Replace me", "id": "997", "location_index": "10", "last_location": "false" }, { "name": "Last location", "text_info": "Replace me", "id": "998", "last_location": "true" }], "locations": 0 } })
      });
  }, [status, routeData.id]);

  function deleteLocation(routeID, id) {
    /**
    *API call DELETE and passes an ID to delete a specific location inside a tour.
    *routeData.id specifies the tour and id specifies the location id.
    *if response is OK 200 status changes state to trigger useEffect
    */
    console.log("DELETELOCATION: ID:" + id);
    var data = JSON.stringify({
      "route-update": {
        "route-id": routeID,
        'location': [
          {
            'delete': id,
          },
        ],
      },
    });

    var config = {
      method: "patch",
      url: "/admin/route/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (!status) {
          setStatus(true);
        } else if (status) {
          setStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addLocation(id) {
    /**
    *API call to PATCH to add a new location with default values
    *if response is OK 200 status changes state to trigger useEffect
    */
    console.log("ADDLOCATION: ID:" + id);
    var data = JSON.stringify({
      "route-update": {
        "route-id": id,
        'location': [
          {
            new: 1,
          },
        ],
      },
    });

    var config = {
      method: "patch",
      url: "/admin/route/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (!status) {
          setStatus(true);
        } else if (status) {
          setStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateLocation(routeID, idFrom, idTo) {
    /**
    *API call PATCH to swap location_index on two location objects based on their ID
    *if response is OK 200 status changes state to trigger useEffect
    */
    console.log("Update: routeID: " + routeID + "IDTO: " + idTo + "IDFROM: " + idFrom)
    var data = {
      "route-update": {
        "route-id": routeID,
        "location": [
          {
            "from": idFrom,
            "to": idTo,
          },
        ],
      },
    };

    var config = {
      method: "patch",
      url: "/admin/route/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (!status) {
          setStatus(true);
        } else if (status) {
          setStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSave = (id, title, description) => {
    /**
    *API call PATCH to save and update all form-data to database
    *if OK 200 redirect user by replacing URL through navigate
    */
    console.log("SAVE: ID" + id + "TITLE: " + title + "DESCRIPTION: " + description)

    var data = {
      "route-update": {
        "route-id": id,
        "title": title,
        "description": description,
        "image": "",
        "type": "INFO",
        "location": [
        ]
      }
    }

    var config = {
      method: 'patch',
      url: '/admin/route/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate('/admin', { replace: true });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  if (routeLocationsData.length !== 0) {
    /*
    returns html if routeLocationsData is populated
    each seperate location is handled in Location.js with references to data-array-object and functions
    */
    return (<>
      <div className="container white container-css">
        <AdminEditForms
          mainData={routeData}
          locationsData={routeLocationsData}
          callSaveRoute={handleSave}
          callMoveLocation={updateLocation}
          callNewLocation={addLocation}
          callDeleteLocation={deleteLocation}
        />

      </div>
    </>
    );
  } else {
    return (
      <>
        <p>Laddar</p>
      </>
    );
  }
}