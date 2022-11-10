import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Location from "./components/Location";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminEdit() {
  const navigate = useNavigate();

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
        //dev placeholder data
        setRouteLocationsData({"route":{"location":[{"name":"1","text_info":"Replace me","id":"988","location_index":"1","last_location":"false"},{"name":"2","text_info":"Replace me","id":"989","location_index":"2","last_location":"false"},{"name":"3","text_info":"Replace me","id":"990","location_index":"3","last_location":"false"},{"name":"4","text_info":"Replace me","id":"991","location_index":"4","last_location":"false"},{"name":"5","text_info":"Replace me","id":"992","location_index":"5","last_location":"false"},{"name":"6","text_info":"Replace me","id":"993","location_index":"6","last_location":"false"},{"name":"7","text_info":"Replace me","id":"994","location_index":"7","last_location":"false"},{"name":"8","text_info":"Replace me","id":"995","location_index":"8","last_location":"false"},{"name":"9","text_info":"Replace me","id":"996","location_index":"9","last_location":"false"},{"name":"10","text_info":"Replace me","id":"997","location_index":"10","last_location":"false"},{"name":"Last location","text_info":"Replace me","id":"998","last_location":"true"}],"locations":0}})
      });
  }, [status, routeData.id]);

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

  const handleSave = () => {
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
                <ul className="collapsible">
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
