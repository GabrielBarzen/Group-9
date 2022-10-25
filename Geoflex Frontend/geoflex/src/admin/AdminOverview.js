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

    useEffect (() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8080/admin/routes',
            headers: { 
            }
          };

          axios(config)
          .then(function (response) {
            setTours(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [])
    
    return (
        <section>
            <h2>Översikt</h2>
            {[...tours].map(tour => <Tour key={tour.id} data={tour} />)}            
            <Link to='/admin/new/'>
                <button id="add-new">Lägg till</button>
            </Link>
        </section>
    )
}
/*
            <button className="quiz">Runes Quiz</button>
            <button className="info">Runes Rundtur</button>
            <button className="mixed">Runes Roliga Runda</button>
*/