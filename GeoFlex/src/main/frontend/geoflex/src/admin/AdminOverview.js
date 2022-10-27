import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminAddNew from './AdminAddNew';
import Tour from './components/Tour';
import axios from 'axios';

/*
[{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quizz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"10","code":"983850","locations":6}]
*/
export default function AdminOverview() {
    const [tours, setTours] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect (() => {
        var config = {
            method: 'get',
            url: '/admin/routes',
            headers: { 
            }
          };

          axios(config)
          .then(function (response) {
            setTours(response.data)
          })
          .catch(function (error) {
            console.log(error);
            //setTours([{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quiz9","description":"This quiz is for testing purposes.","type":"QUIZ","id":"15","code":"590353","locations":6},{"title":"Test QuizPostman","description":"This quiz is for testing purposes.","type":"QUIZ","id":"16","code":"701553","locations":6},{"title":"This is the title","description":"This quiz is for testing purposes.","type":"QUIZ","id":"20","code":"133348","locations":6},{"title":"Test Quiz96","description":"This quiz is for testing purposes.","type":"QUIZ","id":"21","code":"132743","locations":6},{"title":"Postman test","description":"This quiz is for testing purposes.","type":"QUIZ","id":"24","code":"879662","locations":6},{"title":"Testar lite","description":"This quiz is for testing purposes.","type":"QUIZ","id":"26","code":"384675","locations":6},{"title":"Postman test 2","description":"This quiz is for testing purposes.","type":"QUIZ","id":"27","code":"291633","locations":6},{"title":"Den här fungerar ju","description":"This quiz is for testing purposes.","type":"QUIZ","id":"28","code":"592054","locations":6},{"title":"Test","description":"Test","type":"QUIZ","id":"29","code":"988068","locations":6},{"title":"funka nu ","description":"kom igen","type":"QUIZ","id":"30","code":"343349","locations":6},{"title":"heruy","description":"quiz83\n","type":"QUIZ","id":"31","code":"697956","locations":6}])

          });
      }, [status])

    function deleteItem(id){

    var config = {
      method: 'delete',
      url: '/admin/route?route-id='+ id,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //för att uppdatera tours genom state på status:
      if(!status){
        setStatus(true);
      } else if(status){
      setStatus(false);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
    }
    
    if(tours){return (
        <section>
            <h2>Översikt</h2>
            <ul>
            {[...tours].map(tour => <Tour key={tour.id} data={tour} deleteItem={deleteItem}/>)}
            <Link to='/admin/new/'>
                <button id="add-new">Lägg till</button>
            </Link>
            </ul>
        </section>
    )
} else {
    return (
    <section><h1>Laddar</h1></section>
    )
}
}
/*
            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
*/