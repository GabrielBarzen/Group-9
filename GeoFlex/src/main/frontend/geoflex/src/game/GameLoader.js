import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameManager from './GameManager';
import GameWelcome from './GameWelcome';
import { useLocation } from 'react-router';


export default function GameLoader() {
    const [data, setData] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [gameStart, setGameStart] = useState(false)
    const [status, setStatus] = useState(false);

    //location recieves data from Link
    const location = useLocation();
    const routeCode = location.state.routeCode;
    const routeID = location.state.id;


    useEffect(() => {
        var config = {
            method: 'get',
            url: '/user/route?routeCode='+routeCode,
            headers: {}
        };

        axios(config)
            .then(async response => {
                console.log(JSON.stringify(response.data));
                await localStorage.clear();
                await localStorage.setItem('quizData', JSON.stringify(response.data[0]));
                await setData({
                    title: response.data[0].title,
                    description: response.data[0].description,
                    type: response.data[0].type,
                    id: response.data[0].id,
                    code: response.data[0].code,
                })
                await setQuestions(response.data[0].location)
                await setStatus(true);
            })
            .catch(async error => {
                console.log(error);
                const dummyData = [
                    {
                        "title": "Cars",
                        "description": "Quiz about cars",
                        "type": "INFO",
                        "id": "103",
                        "code": "1234",
                        "location": [
                            {
                                "location_id": "126497",
                                "name": "Car engines",
                                "text_info": "Which engine does this car belong to?",
                                "qr": "true",
                                "location_index": "2",
                                "last_location": "false",
                                "directions": "Följ vägen.",
                                "content": [
                                    {
                                        "content-id": "135",
                                        "answer": "Lamborghini",
                                        "correct": true
                                    },
                                    {
                                        "content-id": "136",
                                        "answer": "Bugatti",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "137",
                                        "answer": "Ford",
                                        "correct": false
                                    }
                                ],
                                "media": [
                                    {
                                        "mediaURL": "http://localhost:8080/files/locations/116497/Lamborghini-Aventador-V12-engine_o.jpg",
                                        "mediaType": "image",
                                        "externalMedia": true
                                    }
                                ]
                            },
                            {
                                "location_id": "116495",
                                "name": "Car models",
                                "text_info": "Which type of car is this?",
                                "qr": "false",
                                "location_index": "3",
                                "last_location": "false",
                                "x_coords": "13.598689",
                                "y_coords": "56.153022",
                                "content": [
                                    {
                                        "content-id": "128",
                                        "answer": "BMW",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "129",
                                        "answer": "Mercedes",
                                        "correct": true
                                    },
                                    {
                                        "content-id": "130",
                                        "answer": "Audi",
                                        "correct": false
                                    }
                                ],
                                "media": [
                                    {
                                        "mediaURL": "https://www.youtube.com/embed/AtXiFTw_hbU",
                                        "mediaType": "video",
                                        "externalMedia": true
                                    }
                                ]
                            },
                            {
                                "location_id": "116496",
                                "name": "Car wheels",
                                "text_info": "What car does these wheels belong to?",
                                "qr": "false",
                                "location_index": "4",
                                "last_location": "false",
                                "x_coords": "13.055918",
                                "y_coords": "55.58222",
                                "content": [
                                    {
                                        "content-id": "131",
                                        "answer": "Audi",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "133",
                                        "answer": "Volvo",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "134",
                                        "answer": "BMW",
                                        "correct": true
                                    }
                                ],
                                "media": [
                                    {
                                        "mediaURL": "http://localhost:8080/files/locations/116496/Screenshot_20221212_215431.png",
                                        "mediaType": "image",
                                        "externalMedia": false
                                    }
                                ]
                            },
                            {
                                "location_id": "116497",
                                "name": "Car engines",
                                "text_info": "Which engine does this car belong to?",
                                "qr": "true",
                                "location_index": "5",
                                "last_location": "false",
                                "directions": "Följ vägen.",
                                "content": [
                                    {
                                        "content-id": "135",
                                        "answer": "Lamborghini",
                                        "correct": true
                                    },
                                    {
                                        "content-id": "136",
                                        "answer": "Bugatti",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "137",
                                        "answer": "Ford",
                                        "correct": false
                                    }
                                ],
                                "media": [
                                    {
                                        "mediaURL": "http://localhost:8080/files/locations/116497/Lamborghini-Aventador-V12-engine_o.jpg",
                                        "mediaType": "image",
                                        "externalMedia": true
                                    }
                                ]
                            },
                            {
                                "location_id": "116498",
                                "name": "Steering wheels",
                                "text_info": "Which car model does this steering wheel belong to?",
                                "qr": "false",
                                "location_index": "6",
                                "last_location": "false",
                                "x_coords": "13.055918",
                                "y_coords": "55.58222",
                                "content": [
                                    {
                                        "content-id": "138",
                                        "answer": "Volvo",
                                        "correct": true
                                    },
                                    {
                                        "content-id": "139",
                                        "answer": "BMW",
                                        "correct": false
                                    },
                                    {
                                        "content-id": "140",
                                        "answer": "Nissan",
                                        "correct": false
                                    }
                                ],
                                "media": [
                                    {
                                        "mediaURL": "http://localhost:8080/files/locations/116498/2022-10-04 15-34-00.mp4",
                                        "mediaType": "video",
                                        "externalMedia": false
                                    }
                                ]
                            },
                            {
                                "location_id": "116499",
                                "name": "Car categories",
                                "text_info": "Which category does this car belong to?",
                                "qr": "true",
                                "location_index": "7",
                                "last_location": "false",
                                "directions": "Kategori vägbeskrivning",
                                "content": [
                                    {
                                        "content-id": "141",
                                        "answer": "Super car",
                                        "correct": true
                                    },
                                    {
                                        "content-id": "142",
                                        "answer": "SUV",
                                        "correct": false
                                    }, { "content-id": "143", "answer": "Motorbikes", "correct": false }], "media": [{ "mediaURL": "https://www.bugatti.com/fileadmin/_processed_/sei/p54/se-image-4799f9106491ebb58ca3351f6df5c44a.jpg", "mediaType": "image", "externalMedia": true }]
                            },
                            {
                                "location_id": "116501",
                                "name": "The End of The Car Quiz!",
                                "text_info": "Thank you for participating!",
                                "qr": "false",
                                "last_location": "true",
                                "content": [

                                ],
                                "media": [
                                    {
                                        "mediaURL": "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/86395/s960_thank_you_sticky_note.jpg",
                                        "mediaType": "image",
                                        "externalMedia": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
                await localStorage.setItem('quizData', JSON.stringify(dummyData[0]));
                await setData({
                    title: dummyData[0].title,
                    description: dummyData[0].description,
                    type: dummyData[0].type,
                    id: dummyData[0].id,
                    code: dummyData[0].code,
                })
                await setQuestions(dummyData[0].location)
                await setStatus(true)
            });

    }, [])


    if (status === false) {
        return <p>Loading data...</p>;
    } else if ((status === true) && (gameStart === false)) {
        return (
            <>
                <GameWelcome
                    welcomeData={data}
                    setGameStart={setGameStart}
                />
            </>
        );
    } else if ((status === true) && (gameStart === true)) {
        return (
            <>
                <GameManager
                    control={data}
                    questions={questions}
                />
            </>
        )
    }
}
/*
<pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(questions, null, 2)}</pre>
*/
