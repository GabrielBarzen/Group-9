import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Location from "./components/Location";
import M from "materialize-css";
import axios from "axios";

export default function AdminEdit() {
  //location tar emot data från föregående sida
  const location = useLocation();
  const routeData = location.state.data;

  const [routeLocationsData, setRouteLocationsData] = useState([]);
  const [status, setStatus] = useState(false);

  let titleRef = useRef();
  let descriptionRef = useRef();
 

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
      });
  }, [status, routeData.id]);

  const handleSave = (event) => {
    console.log(event);
    console.log("Hejsan");

    var data = {
      "route-update": {
        "route-id": routeData.id,
        'title': titleRef.current.value,
        'description': descriptionRef.current.value,
        'image': "",
        'type': "QUIZ",
        'location': [],
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    M.AutoInit();
  }, []);

  function deleteLocation(id) {
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
  if (routeLocationsData.length !== 0) {
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
                <button onClick={(event) => handleSave(event)}>Spara</button>
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
