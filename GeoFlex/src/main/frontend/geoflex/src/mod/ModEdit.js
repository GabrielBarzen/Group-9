import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModEditForms from "./components/ModEditForms";

export default function ModEdit() {
  /** 
  *ModEdit.js allows the moderator to edit a single route.
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
    var config = {
      method: "get",
      url: "/moderator/route/locations?route-id=" + routeData.id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let locations = [];
        let last_location = null;

        response.data.forEach(element => {
          if (element.last_location === "false") {
            locations.push(element)
          } else if (element.last_location === "true") {
            last_location = element
          }
        });
        locations.sort((a, b) => (a.location_index > b.location_index ? 1 : -1));
        locations.push(last_location);
        setRouteLocationsData(locations);

      })
      .catch(function (error) {
        console.log(error);
      });

  }, [status, routeData.id]);

  function deleteLocation(routeID, id) {
    /**
    *API call DELETE and passes an ID to delete a specific location inside a tour.
    *routeData.id specifies the tour and id specifies the location id.
    *if response is OK 200 status changes state to trigger useEffect
    */

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
      url: "/moderator/route/",
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
      url: "/moderator/route/",
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
      url: "/moderator/route/",
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

  const handleSave = (data) => {
    /**
    *API call PATCH to save and update all form-data to database
    *if OK 200 redirect user by replacing URL through navigate
    */

    var config = {
      method: 'patch',
      url: '/moderator/route/',
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
        <ModEditForms
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