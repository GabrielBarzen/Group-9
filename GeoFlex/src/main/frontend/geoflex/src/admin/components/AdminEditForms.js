import React, { useEffect, useRef, useState } from 'react';
import Location from './Location';

export default function AdminEditForms(props) {

  let titleRef = useRef();
  let descriptionRef = useRef();
  const dataLength = props.locationsData.route.location.length;


  function swapLocationsUp(idFrom) {
    /*

    {"route":{"location":[{"name":"1","text_info":"Replace me","id":"988","location_index":"1","last_location":"false"},{"name":"2","text_info":"Replace me","id":"989","location_index":"2","last_location":"false"},{"name":"3","text_info":"Replace me","id":"990","location_index":"3","last_location":"false"},{"name":"4","text_info":"Replace me","id":"991","location_index":"4","last_location":"false"},{"name":"5","text_info":"Replace me","id":"992","location_index":"5","last_location":"false"},{"name":"6","text_info":"Replace me","id":"993","location_index":"6","last_location":"false"},{"name":"7","text_info":"Replace me","id":"994","location_index":"7","last_location":"false"},{"name":"8","text_info":"Replace me","id":"995","location_index":"8","last_location":"false"},{"name":"9","text_info":"Replace me","id":"996","location_index":"9","last_location":"false"},{"name":"10","text_info":"Replace me","id":"997","location_index":"10","last_location":"false"},{"name":"Last location","text_info":"Replace me","id":"998","last_location":"true"}],"locations":0}}
    onClick function to move a location-object up
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered below and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    let routeID = props.mainData.id;
    var temp = "";
    var idToIndex = "";
    var idTo = "";
    props.locationsData.route.location.forEach((element) => {
      if (element.id === idFrom) {
        temp = parseInt(element.location_index);
        idToIndex = temp - 1;
      }
    });

    props.locationsData.route.location.forEach((item) => {
      if (item.location_index === idToIndex.toString()) {
        idTo = item.id;
      }
    });
    props.callMoveLocation(routeID, idFrom, idTo);
  }

  function swapLocationsDown(idFrom) {
    /*
    onClick function to move a location-object down
    receives the ID from a specific location
    using forEach to sort out the ID of the location rendered above and sends "idFrom, idTo" to updateLocation()
    location_index will always be ordered ascending, making it possible to find the right object    
    */
    let routeID = props.mainData.id;
    var temp = "";
    var idToIndex = "";
    var idTo = "";
    props.locationsData.route.location.forEach((element) => {
      if (element.id === idFrom) {
        temp = parseInt(element.location_index);
        idToIndex = temp + 1;
      }
    });

    props.locationsData.route.location.forEach((item) => {
      if (item.location_index === idToIndex.toString()) {
        idTo = item.id;
      }
    });
    props.callMoveLocation(routeID, idFrom, idTo);
  }

  function handleDelete(id) {
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


  return (
    <>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">label</i>
              <label htmlFor="title">Titel</label>
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
              <ul className="">

                {[...props.locationsData.route.location].map((location) => (
                  <Location
                    key={location.id}
                    data={location}
                    dataLength={dataLength}
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