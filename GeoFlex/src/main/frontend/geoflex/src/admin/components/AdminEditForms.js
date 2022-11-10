import React, { useRef } from 'react';
import Location from './Location';

export default function AdminEditForms(props) {
    let titleRef = useRef();
    let descriptionRef = useRef();
    

    function swapLocationsUp(idFrom) {
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
        props.callMoveLocation(idFrom, idTo);
      }
    
      function swapLocationsDown(idFrom) {
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
        props.callMoveLocation(idFrom, idTo);
      }

      const handleDelete = ((id)=>{
        let routeID = props.mainData.id;
        props.callDeleteLocation(routeID, id);
      })

      const handleNewLocation = (() =>{
        let id = props.mainData.id;
        props.callNewLocation(id);
      })

      const handleSave = (() => {
        let id = props.mainData.id;
        let title = titleRef.current.value;
        let description = descriptionRef.current.value;
        props.callSaveRoute(id, title, description);

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
                <ul className="collapsible">
                  {[...props.locationsData.route.location].map((location) => (
                    <Location
                      key={location.id}
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