import React, { useEffect, useState } from 'react';
import AdminModRoutes from './AdminModRoutes';
import AdminModAssignRoutes from './AdminModAssignRoutes';
import M from 'materialize-css';

export default function AdminModeratorOverview(props) {
    const [selectItems, setSelectItems] = useState([]);
    const routeData = props.moderatorRoutesData;


    const handleSelectOptions = () => {
        
        const dummyData = [{ "title": "Test Quiz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "1", "code": "572748", "locations": 3 }, { "title": "Test Info", "description": "This info for testing purposes.", "type": "INFO", "id": "2", "code": "184471", "locations": 3 }, { "title": "Test 2", "description": "More testing tests ", "type": "INFO", "id": "4", "code": "295052", "locations": 0 }, { "title": "Num Location Test1", "description": "test, remove", "type": "INFO", "id": "5", "code": "447827", "locations": 0 }, { "title": "Num Location Test2", "description": "test, remove", "type": "INFO", "id": "6", "code": "625158", "locations": 3 }, { "title": "Num Location Test3", "description": "test, remove", "type": "INFO", "id": "7", "code": "782310", "locations": 4 }, { "title": "Test Quiz2E", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "8", "code": "538027", "locations": 6 }, { "title": "Test Quizz", "description": "This quiz is for testing purposes.", "type": "QUIZ", "id": "10", "code": "983850", "locations": 6 }];


        let allRoutes = props.allRoutesData;
        let routes = props.moderatorRoutesData;


        var leftUsers = allRoutes.filter(u => routeData.findIndex(lu => lu.id === u.id) === -1);


        /*
                let allRoutes = props.allRoutesData;
                let availableRoutes = routeData.filter(val => !allRoutes.includes(val));
                
                availableRoutes.forEach(element => {
                    
                });
        
                setSelectItems(availableRoutes);
        */
        setSelectItems(leftUsers)
    }


    useEffect(() => {
        M.AutoInit();
        props.getRouteForUser(props.data["user-id"])
    }, []);

    return (<>
        <li>
            <div className="collapsible-header" onClick={handleSelectOptions} >{props.data.name}</div>
            <div className="collapsible-body">
                <ul>
                    {[...routeData].map((route) => (

                        <AdminModRoutes key={(route.id)} data={route} moderator={props.data}/>
                    ))}
                </ul>
                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header">Tilldela rutt</div>
                        <div className="collapsible-body">{[...selectItems].map((item) => (<AdminModAssignRoutes
                                key={item.id}
                                selectItem={item} />
                            ))}</div>
                    </li>
                </ul>
            </div>
        </li>
    </>
    )
}

/*
{[...selectItems].map((item) => (<AdminModAssignRoutes
                            key={item.id}
                            selectItem={item} />
                        ))}



                        {[...selectItems].map((item) => (<AdminModAssignRoutes
                                key={item.id}
                                selectItem={item} />
                            ))}
*/