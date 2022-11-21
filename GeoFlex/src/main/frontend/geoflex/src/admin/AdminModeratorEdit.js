import React, { useEffect, useState } from 'react';
import AdminModeratorOverview from './components/AdminModeratorOverview';
import M from 'materialize-css';
import axios from "axios";


export default function AdminModeratorEdit() {
    const [moderators, setModerators] = useState(
    );
    const [moderatorRoutes, setModeratorRoutes] = useState(null)
    
    const dummyModerators = [{"name": "Max","user-id": 78},{"name": "Jack", "user-id": 79},{"name": "Lux","user-id": 80 },{"name": "Sivir","user-id": 81}];
    
    var assignedRouteExample = {
        "routes-for-user":[
        {
        "code":6960,
        "description":"Postman edit test",
        "locations":17,
        "id":96,
        "title":"Spongebob Squarepants",
        "type":"INFO"
        },
        {
        "code":10501,
        "description":"Quiz om Malmö",
        "locations":5,
        "id":97,
        "title":"Malmö",
        "type":"QUIZ"
        }
        ]
        };

    //dummmy-data över alla tillgängliga quiz
    const dummyData = [{"title":"Test Quiz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"1","code":"572748","locations":3},{"title":"Test Info","description":"This info for testing purposes.","type":"INFO","id":"2","code":"184471","locations":3},{"title":"Test 2","description":"More testing tests ","type":"INFO","id":"4","code":"295052","locations":0},{"title":"Num Location Test1","description":"test, remove","type":"INFO","id":"5","code":"447827","locations":0},{"title":"Num Location Test2","description":"test, remove","type":"INFO","id":"6","code":"625158","locations":3},{"title":"Num Location Test3","description":"test, remove","type":"INFO","id":"7","code":"782310","locations":4},{"title":"Test Quiz2E","description":"This quiz is for testing purposes.","type":"QUIZ","id":"8","code":"538027","locations":6},{"title":"Test Quizz","description":"This quiz is for testing purposes.","type":"QUIZ","id":"10","code":"983850","locations":6}];


    useEffect(() => {
        M.AutoInit();
        getModeratorList();
    });

    /**
     * Hämtar en lista av alla moderatorer.
     */
    function getModeratorList() {
        var config = {
            method: 'get',
            url: '/admin/moderators',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setModerators(response.data.moderators)
            })
            .catch(function (error) {
                console.log(error);
                //dummy data som ska tas bort:
                setModerators(dummyModerators)
            });
    }

    /**
     * Skapar en moderator.
     */
    function createModerator() {
        var data = JSON.stringify(
            {
                "create-moderator":
                {
                    "name": "Sätt värde från input",
                    "email": "Sätt värde från input",
                    "password": "Sätt värde från input"
                }
            }
        );

        var config = {
            method: 'post',
            url: '/admin/create/moderator',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Hämtar alla quiz en moderator har blivit tilldelad med hjälp av dens ID.
     * Bara id 81 har quizzes atm.
     */
    function getRouteForUser(id){
        setModeratorRoutes(null);
        var config = {
            method: 'get',
            url: '/admin/route/user?user-id=' + id,
            headers: { 
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setModeratorRoutes(response.data["routes-for-user"])
          })
          .catch(function (error) {
            console.log(error);
            //dummy data som ska tas bort:
            setModeratorRoutes(assignedRouteExample)
          });
          
    }

    return (<>
        <div className='white'>
            <p>Översikt på moderatorer</p>
            <ul className='collapsible'>
                {[...moderators].map((moderator) => (
                    <AdminModeratorOverview key={moderator['user-id']} getRouteForUser={getRouteForUser} data={moderator} routeData={assignedRouteExample} allRoutesData={dummyData}/>
                ))}
            </ul>
        </div>
    </>
    )
}
