import React, { useState, useEffect } from "react";
import Tour from "./components/Tour";
import axios from "axios";
/*
placeholder while developing - clean this
[{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quizz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"10","code":"983850","locations":6}]
*/
export default function ModOverview() {
  const [tours, setTours] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log("OVERVIEW USEEFFECT");
    /*
    useEffect renders every first load of the page and then every time the state of "status" changes.
    API call GET an overview-object of all tours (quiz or infotour) and changes the state of the "tours"-variable to contain the response object.
    */
    var config = {
      method: "get",
      url: "/moderator/routes",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setTours(response.data);
      })
      .catch(function (error) {
        console.log(error);

        //Dev placeholderdata
        const placeholder = [{ "title": "Test Quiz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "1", "code": "2748", "locations": 3 }, { "title": "Test Info", "description": "This info for testing purposes.", "type": "INFO", "id": "2", "code": "4471", "locations": 3 }, { "title": "Test 2", "description": "More testing tests ", "type": "INFO", "id": "4", "code": "2952", "locations": 0 }, { "title": "Num Location Test1", "description": "test, remove", "type": "INFO", "id": "5", "code": "4477", "locations": 0 }, { "title": "Num Location Test2", "description": "test, remove", "type": "INFO", "id": "6", "code": "5158", "locations": 3 }, { "title": "Num Location Test3", "description": "test, remove", "type": "INFO", "id": "7", "code": "2310", "locations": 4 }, { "title": "Test Quiz2E", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "8", "code": "5327", "locations": 6 }, { "title": "Test Quizz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "10", "code": "9830", "locations": 6 }];
        placeholder.reverse();
        setTours(placeholder);
      });
  }, [status]);

  function deleteItem(id) {
    console.log("OVERVIEW DELETE");
    /*
    API call DELETE to remove a single tour based on its ID
    */
    var config = {
      method: "delete",
      url: "/moderator/route?route-id=" + id,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //if response is ok 200 switch state of status to trigger useEffect to show an updated object
        if (!status) {
          setStatus(true);
        } else if (status) {
          setStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  if (tours.length !== 0) {
    /*
    if: tours is populated we render the jsx HTML passing each tour into Tour.js along with all its data and the DELETE function.
    else: a loading circle will render while waiting for tours to be populated
    */
    return (
      <div className="container white container-css">
        <div className="row">
          <div className="col s12 m4 l8">
            <h2>Översikt</h2>
            <ul className="collection">
              {[...tours].map((tour) => (
                <Tour key={tour.id} data={tour} deleteItem={deleteItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <section className="container center-align">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}