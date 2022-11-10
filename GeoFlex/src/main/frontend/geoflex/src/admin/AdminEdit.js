import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminEditForms from "./components/AdminEditForms";

export default function AdminEdit() {
  const navigate = useNavigate();

  //location tar emot data från föregående sida
  const location = useLocation();
  const routeData = location.state.data;

  const [routeLocationsData, setRouteLocationsData] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log(status);
    console.log("STATUS");
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
        //setRouteLocationsData({"route":{"location":[{"name":"1","text_info":"Replace me","id":"988","location_index":"1","last_location":"false"},{"name":"2","text_info":"Replace me","id":"989","location_index":"2","last_location":"false"},{"name":"3","text_info":"Replace me","id":"990","location_index":"3","last_location":"false"},{"name":"4","text_info":"Replace me","id":"991","location_index":"4","last_location":"false"},{"name":"5","text_info":"Replace me","id":"992","location_index":"5","last_location":"false"},{"name":"6","text_info":"Replace me","id":"993","location_index":"6","last_location":"false"},{"name":"7","text_info":"Replace me","id":"994","location_index":"7","last_location":"false"},{"name":"8","text_info":"Replace me","id":"995","location_index":"8","last_location":"false"},{"name":"9","text_info":"Replace me","id":"996","location_index":"9","last_location":"false"},{"name":"10","text_info":"Replace me","id":"997","location_index":"10","last_location":"false"},{"name":"Last location","text_info":"Replace me","id":"998","last_location":"true"}],"locations":0}})
      });
  }, [status, routeData.id]);

  function deleteLocation(id) {
    console.log("DELETELOCATION: ID:" + id);
    var data = JSON.stringify({
      "route-update": {
        "route-id": routeData.id,
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
    return (
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
    );
  } else {
    return (
      <>
        <p>Laddar</p>
      </>
    );
  }
}