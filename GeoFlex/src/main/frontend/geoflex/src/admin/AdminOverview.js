import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tour from "./components/Tour";
import Button from "../shared/Button";
import axios from "axios";

/*
placeholder while developing - clean this
[{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quizz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"10","code":"983850","locations":6}]
*/

export default function AdminOverview() {
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
            url: "/admin/routes",
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setTours(response.data);
            })
            .catch(function (error) {
                console.log(error);

                //Dev placeholderdata
                setTours([{ "title": "Test Quiz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "1", "code": "572748", "locations": 3 }, { "title": "Test Info", "description": "This info for testing purposes.", "type": "INFO", "id": "2", "code": "184471", "locations": 3 }, { "title": "Test 2", "description": "More testing tests ", "type": "INFO", "id": "4", "code": "295052", "locations": 0 }, { "title": "Num Location Test1", "description": "test, remove", "type": "INFO", "id": "5", "code": "447827", "locations": 0 }, { "title": "Num Location Test2", "description": "test, remove", "type": "INFO", "id": "6", "code": "625158", "locations": 3 }, { "title": "Num Location Test3", "description": "test, remove", "type": "INFO", "id": "7", "code": "782310", "locations": 4 }, { "title": "Test Quiz2E", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "8", "code": "538027", "locations": 6 }, { "title": "Test Quizz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "10", "code": "983850", "locations": 6 }]);
            });
    }, [status]);

    function deleteItem(id) {
        console.log("OVERVIEW DELETE")
        /*
        API call DELETE to remove a single tour based on its ID
        */
        var config = {
            method: "delete",
            url: "/admin/route?route-id=" + id,
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
                    <div className="col s12">
                        <h5 className="center align">Översikt</h5>
                    </div>
                    <div className="col s12">
                        <ul className="collection">
                            {[...tours].map((tour) => (
                                <Tour key={tour.id} data={tour} deleteItem={deleteItem} />
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="row">
                    <div className="center-align">
                        <Link to="/admin/new/">
                            <Button
                                css=" s12 green yellow lighten-3"

                                icon={
                                    <i className="material-icons black-text">
                                        add_circle_outline
                                    </i>
                                }
                            />
                        </Link>
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
/*

  if (tours.length != 0) {
    return (
      <section className='container'>
        <h2 className='center '>Översikt</h2>
        <ul className=''>
          {[...tours].map(tour => <Tour key={tour.id} data={tour} deleteItem={deleteItem} />)}
          <Link to='/admin/new/'>
            <Button text={"Lägg till"} icon={<i className="material-icons">add_circle_outline</i>} />
          </Link>
        </ul>
      </section>
    )
  } else {
    return (
      <section className='container center-align'>
          <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
      </section>
    )
  }
}
/*
<li className='row'>
        <Link style={{cursor: 'pointer', 'font-size': '2rem'}} className='col s10 waves-effect waves-teal btn-edit white-text z-depth-2' to={url} state={{ data: props.data }}>
          {props.data.title}
        </Link>
        <span style={{cursor: 'pointer', 'font-size': '2rem'}} className="col s2 waves-effect waves-red red darken-3 btn-delete center-align right z-depth-2"><i className='material-icons' id={props.data.id} onClick={() => { props.deleteItem(props.data.id) }}>delete_forever</i></span>
        
      </li>




            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
*/

/*

<section className='container'>
          <h2 className='center '>Översikt</h2>
          <ul className=''>
            {[...tours].map(tour => <Tour key={tour.id} data={tour} deleteItem={deleteItem} />)}

*/
