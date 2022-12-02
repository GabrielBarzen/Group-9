import React, { useRef, useEffect } from 'react';
import Location from './Location';
import M from 'materialize-css'

export default function ModEditForms(props) {

  let titleRef = useRef();
  let descriptionRef = useRef();

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();

  }, []);

  function swapLocationsUp(locIndex) {
    /*
    onClick function to move a location-object up
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered below and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    let routeID = props.mainData.id;
    var idToIndex = (parseInt(locIndex) - 1);
    var idTo = "";
    let idFrom = ""

    props.locationsData.forEach((item) => {
      console.log(item.location_index + "   " + idToIndex);
      if (item.location_index === locIndex) {
        idFrom = item.location_id;
      } else if (item.location_index === idToIndex.toString()) {
        console.log("IF ELSE")
        idTo = item.location_id
      }
    });
    props.callMoveLocation(routeID, idFrom, idTo);
  }

  function swapLocationsDown(locIndex) {

    /*
    onClick function to move a location-object down
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered above and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    let routeID = props.mainData.id;
    var idToIndex = (parseInt(locIndex) + 1);
    var idTo = "";
    let idFrom = ""

    props.locationsData.forEach((item) => {
      console.log(item.location_index + "   " + idToIndex);
      if (item.location_index === locIndex) {
        idFrom = item.location_id;
      } else if (item.location_index === idToIndex.toString()) {
        console.log("IF ELSE")
        idTo = item.location_id
      }
    });

    props.callMoveLocation(routeID, idFrom, idTo);
  }

  function handleDelete(id) {
    alert(id)

    let routeID = props.mainData.id;
    props.callDeleteLocation(routeID, id);
  }

  const handleNewLocation = (() => {
    let id = props.mainData.id;
    props.callNewLocation(id);
  })

  const handleSave = (() => {
    let routeID = props.mainData.id;
    let title = titleRef.current.value;
    let description = descriptionRef.current.value;
    props.callSaveRoute(routeID, title, description);

  })


  console.log("ID")
  console.log(props.locationsData)
  console.log(props.mainData.id);

  return (
    <>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">label</i>
              <label>Titel</label>
              <input
                id="title"
                type="text"
                defaultValue={props.mainData.title}
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
                defaultValue={props.mainData.description}
                ref={descriptionRef}
              />
            </div>
          </div>
          <div className="row">

            <div>
              <ul className="collapsible z-depth-0" style={{ 'border': '0' }}>
                {[...props.locationsData].map((location) => (
                  <Location
                    key={location.location_id}
                    route={props.mainData.id}
                    data={location}
                    deleteLocation={handleDelete}
                    swapLocationsUp={swapLocationsUp}
                    swapLocationsDown={swapLocationsDown}
                  />
                ))}
              </ul>
              <i className="material-icons col s1" onClick={handleNewLocation}>
                add_location
              </i>
              <button onClick={handleSave}>Spara</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}