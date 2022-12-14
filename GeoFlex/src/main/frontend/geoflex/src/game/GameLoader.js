import React, { Component } from 'react'
import GameManager from './GameManager';

export default class GameLoader extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        var config = {
            method: 'get',
            url: '127.0.0.1:8080/user/route?routeCode=1234',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                this.setState({data: response.data})
            }.bind(this))
            .catch(function (error) {
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
                                "location_id": "116495",
                                "name": "Car models",
                                "text_info": "Which type of car is this?",
                                "qr": "false",
                                "location_index": "1",
                                "last_location": "false",
                                "x_coords": "13.055918",
                                "y_coords": "55.58222",
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
                                "location_index": "2",
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
                                "location_index": "3",
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
                                "location_index": "4",
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
                                "location_index": "5",
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
                this.setState({data: dummyData})       
            }.bind(this));
    }    

    render() {
        return (
            <>
                <GameManager 
                    data={this.state.data}
                />
            </>
        )
    }
}
