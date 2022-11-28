import React, { Component } from 'react';
import LocationFormAnswers from './LocationFormAnswers';
import LocationFormMedia from './LocationFormMedia';
import ModGeolocate from './ModGeolocate';
//import axios from 'axios';

export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        console.log("CURRENTDATA - LOCATION FORM")
        console.log(this.props.currentData);
        //Här definierar vi alla förifyllda värden baserat på props

        this.state = {
            locationName: props.currentData.name,
            locationInfo: props.currentData.text_info,
            locationID: props.currentData.id,
            locationImage: 'BILD URL HÄR',
            locationVideo: 'Video URL HÄR',
            locationDirections: 'Go left then turn back',
            locationLongitude: 'Longitud här',
            locationLatitude: 'Latitud här',
            locationAnswer1: null,
            locationID1: null,
            locationCorrect1: null,
            locationAnswer2: null,
            locationID2: null,
            locationCorrect2: null,
            locationAnswer3: null,
            locationID3: null,
            locationCorrect3: null,
            locationAnswer4: null,
            locationID4: null,
            locationCorrect4: null,
            locationAnswer5: null,
            locationID5: null,
            locationCorrect5: null
        };

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeoLocation = this.handleGeoLocation.bind(this);
        //this.handleRenderAnswers = this.handleRenderAnswers.bind(this);
    }

/*
    componentDidMount() {
        if (this.props.currentData.content.length === 0) {
            return (
                <div>Content tom</div>
            )
        } else if (this.props.currentData.content.length <= 4) {

            if (this.props.currentData.content[0]) {
                this.setState({
                    locationID1: this.props.currentData.content[0]["content-id"],
                    locationAnswer1: this.props.currentData.content[0].answer,
                    locationCorrect1: this.props.currentData.content[0].correct
                });
                console.log("HÄR HÄR HÄR HÄR HÄR HÄR" + this.props.currentData.content[4]["content-id"])
                console.log(this.state.locationAnswer1)
            } else if (this.props.currentData.content[1]) {
                this.setState({
                    locationID2: this.props.currentData.content[1]["content-id"],
                    locationAnswer2: this.props.currentData.content[1].answer,
                    locationCorrect2: this.props.currentData.content[1].correct
                });
                console.log("HÄR HÄR HÄR HÄR HÄR HÄR" + this.props.currentData.content[4]["content-id"])
                console.log(this.state.locationAnswer2)
            } else if (this.props.currentData.content[2]) {
                this.setState({
                    locationID3: this.props.currentData.content[2]["content-id"],
                    locationAnswer3: this.props.currentData.content[2].answer,
                    locationCorrect3: this.props.currentData.content[2].correct
                });
                console.log("HÄR HÄR HÄR HÄR HÄR HÄR" + this.props.currentData.content[4]["content-id"])
                console.log(this.state.locationAnswer2)
            } else if (this.props.currentData.content[3]) {
                this.setState({
                    locationID4: this.props.currentData.content[3]["content-id"],
                    locationAnswer4: this.props.currentData.content[3].answer,
                    locationCorrect4: this.props.currentData.content[3].correct
                });
                console.log("HÄR HÄR HÄR HÄR HÄR HÄR" + this.props.currentData.content[4]["content-id"])
                console.log(this.state.locationAnswer3)
            } else if (this.props.currentData.content[4]) {
                this.setState({
                    locationContentID5: this.props.currentData.content[4]["content-id"],
                    locationAnswer5: this.props.currentData.content[4].answer,
                    locationCorrect5: this.props.currentData.content[4].correct
                });
                console.log("HÄR HÄR HÄR HÄR HÄR HÄR" + this.props.currentData.content[4]["content-id"])
                console.log(this.state.locationAnswer4)
            }
        }
    }
*/
    

    handleAddAnswer() {
        /**
         * Add a new question
         */
        this.props.addAnswer(this.state.locationID);
    }

    handleGeoLocation(long, lat) {
        /**
         * fetches geolocation data Longitude and Latitude and adds the coords to the current state-object
         */
        this.setState({
            locationLongitude: long,
            locationLatitude: lat
        });
        console.log("Denna knapp ska trigga hämtning av geodata");
    }

    handleInputChange(event) {
        alert("handleinputchange")
        //här lyssnar vi på förändring [name] anpassar sig till name i varje inputfält. 
        //Lite annorlunda om man använder annat än type="text/number" men går att lösa förstås
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        /*
        här bygger vi objektet som ska till databasen 
        och anropar sedan funktionen där API-anropet ligger och skickar med objektet
        just nu får man bara en alert med de värden man fyllt i
        */
        let data = {
            "location-update": {
                "location-id": this.props.currentData.id,
                "name": this.state.locationName,
                "text_info": this.state.locationInfo,
                "qr": "",
                "x_coords": this.state.locationLongitude,
                "y_coords": this.state.locationLatitude,
                "directions": this.state.locationDirections,
                "content": "content"
            }
        }
        this.props.callUpdateLocation(data);

        alert('A value was submitted: ' + this.state.locationName + ' AND: ' + this.state.locationInfo + ' AND: ' + this.state.locationImage + ' AND: ' + this.state.locationVideo + ' AND: ' + this.state.locationLongitude + ' AND: ' + this.state.locationLatitude + ' AND: ' + this.state.locationDirections);
    }



    render() {
        return (
            <div className='container col s12'>
                <h3>Plats 1</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Titel
                        <input
                            className='blue lighten-4'
                            name="locationName" type="text"
                            value={this.state.locationName}
                            onChange={this.handleInputChange} />
                    </label>

                    <label>
                        Innehåll
                        <input
                            className='blue lighten-4'
                            name="locationInfo" type="text"
                            value={this.state.locationInfo}
                            onChange={this.handleInputChange} />
                    </label>
                    <LocationFormMedia locationID={this.props.currentData.id} />
                    <label>
                        Vägbeskrivning
                        <input
                            className='blue lighten-4'
                            name="locationDirections" type="text"
                            value={this.state.locationDirections}
                            onChange={this.handleInputChange} />

                    </label>
                    <fieldset>
                        <label>
                            Longitud
                            <input
                                className='blue lighten-4'
                                name="locationLongitude" type="text"
                                value={this.state.locationLongitude}
                                onChange={this.handleInputChange} />
                        </label>
                        <label>
                            Latitud
                            <input
                                className='blue lighten-4'
                                name="locationLatitude" type="text"
                                value={this.state.locationLatitude}
                                onChange={this.handleInputChange} />
                        </label>
                        <ModGeolocate handleGeoLocation={this.handleGeoLocation} />

                    </fieldset>
                    <fieldset>
                        <LocationFormAnswers 
                        content={this.props.currentData.content} 
                        handleInputChange={this.handleInputChange} />

                        <span onClick={this.handleAddAnswer}>
                            Lägg till svar
                        </span>
                    </fieldset>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

/*
handleShowContent() {
        console.log(this.state.locationID)
        var config = {
            method: 'get',
            url: '/moderator/location/content/?locationId=' + this.state.locationID,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

            })
            .catch(function (error) {
                console.log(error);
                //DummyData:

                let dummyResponse = {
                    "content": [
                        {
                            "answer": "Spongebob",
                            "correct": true,
                            "content-id": 46
                        },
                        {
                            "answer": "Squidward",
                            "correct": false,
                            "content-id": 47
                        },
                        {
                            "answer": "Puffs",
                            "correct": false,
                            "content-id": 53
                        },
                        {
                            "answer": "Patrick",
                            "correct": false,
                            "content-id": 54
                        }
                    ]
                };
                setContent(dummyResponse)
                //setLocationContent(dummyResponse)
                //console.log("HÄR-Location" + locationContent.content[0].answer);
            });

        var setContent = (data) => {
            console.log(data)
            //this.setState({ locationContent: data });
            //console.log("a" + this.state.locationContent)
            {
                data.content.map((content) => {
                    return console.log(content.answer)
            })
            }
    }

    //console.log("CONTENT: " + this.state.locationContent)
    //if(this.state.locationContent.length !== 0){
    //let counter = 1;
    //console.log("LocationFormASD" + this.state.locationContent)
    /*[...this.state.locationContent].map((content) =>{
        
        let title = "Svar" + counter;            
        let contentName = "answer" + content["content-id"];

        counter++
        return(<>
                    <label>
                    {title}
                    <input
                        className='blue lighten-4'
                        name={contentName} type="text"
                        value={content.answer}
                        onChange={this.handleInputChange} />
                </label>
            </>)
    })*/
/*
} else {
    return(
        <div>INGET CONTENT FÖR TILLFÄLLET</div>
    )
}
 
}

*/