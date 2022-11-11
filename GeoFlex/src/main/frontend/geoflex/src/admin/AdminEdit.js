import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Location from "./components/Location";
import M from "materialize-css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminEdit() {
  /* 
  AdminEdit.js allows the administrator to edit a single route.
  navigate is part of react-router-dom and lets you redirect to a specific URL when called like this: " navigate("/admin", { replace: true }); "
  location is part of react-router-dom and allows you to recieve any data sent from previous location/URL from a Link

  */
  const navigate = useNavigate();

  //location recieves data from Link
  const location = useLocation();
  const routeData = location.state.data;

  const [routeLocationsData, setRouteLocationsData] = useState([]);
  const [status, setStatus] = useState(false);

  let titleRef = useRef();
  let descriptionRef = useRef();


  useEffect(() => {
    /*
    useEffect renders every first load of the page and then every time the state of "status" changes. routeData.id is also included at the en as a dependency
    API call GET to receive all locations bound to a specific tour ID
    */
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
      });
  }, [status, routeData.id]);

  useEffect(() => {
    //useEffect to initialize M from material css framework every time the page load
    M.AutoInit();
  }, []);

  function deleteLocation(id) {
    /*
    API call DELETE and passes an ID to delete a specific location inside a tour.
    routeData.id specifies the tour and id specifies the location id.
    if response is OK 200 status changes state to trigger useEffect
    */
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

  function addLocation() {
    /*
    API call to PATCH to add a new location with default values
    if response is OK 200 status changes state to trigger useEffect
    */
    var data = JSON.stringify({
      "route-update": {
        "route-id": routeData.id,
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

  function swapLocationsUp(idFrom) {
    /*
    onClick function to move a location-object up
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered above and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    var temp = "";
    var idToIndex = "";
    var idTo = "";
    routeLocationsData.route.location.forEach((element) => {
      if (element.id === idFrom) {
        temp = parseInt(element.location_index);
        idToIndex = temp - 1;
      }
    });

    routeLocationsData.route.location.forEach((item) => {
      if (item.location_index === idToIndex.toString()) {
        idTo = item.id;
      }
    });
    updateLocation(idFrom, idTo);
  }

  function swapLocationsDown(idFrom) {
    /*
    onClick function to move a location-object up
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered below and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    var temp = "";
    var idToIndex = "";
    var idTo = "";
    routeLocationsData.route.location.forEach((element) => {
      if (element.id === idFrom) {
        temp = parseInt(element.location_index);
        idToIndex = temp + 1;
      }
    });

    routeLocationsData.route.location.forEach((item) => {
      if (item.location_index === idToIndex.toString()) {
        idTo = item.id;
      }
    });
    updateLocation(idFrom, idTo);
  }

  function updateLocation(idFrom, idTo) {
    /*
    API call PATCH to swap location_index on two location objects based on their ID
    if response is OK 200 status changes state to trigger useEffect
    */
    var data = {
      "route-update": {
        "route-id": routeData.id,
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

  const handleSave = () => {
    /*
    API call PATCH to save and update all form-data to database
    if OK 200 redirect user by replacing URL through navigate
    */
    console.log("Hejsan");
    console.log(routeData.id);
    console.log(titleRef.current.value);
    console.log(descriptionRef.current.value);

    var data = {
      "route-update": {
        "route-id": routeData.id,
        "title": titleRef.current.value,
        "description": descriptionRef.current.value,
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
    return (
      <div className="container white container-css">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">label</i>
                <label htmlFor="title">Titel</label>
                <input
                  id="title"
                  type="text"
                  defaultValue={routeData.title}
                  ref={titleRef}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <label htmlFor="description">Beskrivning</label>
                <textarea
                  type="text"
                  className="materialize-textarea"
                  id="description"
                  defaultValue={routeData.description}
                  ref={descriptionRef}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <ul className="">
                  {[...routeLocationsData.route.location].map((location) => (
                    <Location
                      key={location.id}
                      data={location}
                      deleteLocation={deleteLocation}
                      swapLocationsUp={swapLocationsUp}
                      swapLocationsDown={swapLocationsDown}
                    />
                  ))}
                </ul>
                <i className="material-icons col s1" onClick={addLocation}>
                  add_location
                </i>
                <button onClick={handleSave}>Spara</button>
              </div>
            </div>
          </div>
        </div>
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

/*

<fieldset>

<label>Titel</label>
<input type="text" defaultValue={routeData.title} ref={titleRef} />
<label>Beskrivning</label>
<textarea type="text" defaultValue={routeData.description} ref={descriptionRef} />
<label>Typ</label>
<select defaultValue={routeData.type} ref={typeRef}>
    <option value=""></option>
    <option value="QUIZ">Quiz</option>
    <option value="INFO">Inforunda</option>
</select>
<ul className="">
    {[...routeLocationsData.route.location].map(location => <Location key={location.id} data={location} deleteLocation={deleteLocation} swapLocationsUp={swapLocationsUp} swapLocationsDown={swapLocationsDown}/>)}
</ul>
<i className="material-icons col s1" onClick={addLocation} >add_location</i>
<button onClick={event => handleSave(event)}>Spara</button>
</fieldset>

*/
