import React, { Component } from 'react';
import LocationFormAnswers from './LocationFormAnswers';
import LocationFormMedia from './LocationFormMedia';
import ModGeolocate from './ModGeolocate';
//import axios from 'axios';


/**
 * TODO:
 *      
 *      setState för media så de kan få rätt url
 *      ordna lägg till content med begränsning på 5
 *      se över API anrop och lägg till TA BORT ett svar
 *      
 *      skicka formulär
 * 
 * DONE:
 *      radiobutton för correct answer
 */

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

            locationAnswer1: "",
            locationContentID1: "",
            locationCorrect1: "",

            locationAnswer2: "",
            locationContentID2: "",
            locationCorrect2: "",

            locationAnswer3: "",
            locationContentID3: "",
            locationCorrect3: "",

            locationAnswer4: "",
            locationContentID4: "",
            locationCorrect4: "",

            locationAnswer5: "",
            locationContentID5: "",
            locationCorrect5: ""
        };

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeoLocation = this.handleGeoLocation.bind(this);
        //this.handleRenderAnswers = this.handleRenderAnswers.bind(this);
    }
    componentDidMount() {
        console.log("COMPONENT DID MOUNT")
        console.log(this.props.currentData.content[1])
        //console.log(this.props.currentData.content[0].answer)
        let contentLength = this.props.currentData.content.length
        //console.log("LENGTH")
        //console.log(contentLength)
        if (this.props.currentData.content !== 0) {
            console.log("DIDMOUNT IF")
            switch (contentLength) {
                case 1:
                    this.setState({
                        locationAnswer1: this.props.currentData.content[0].answer,
                        locationContentID1: this.props.currentData.content[0]["content-id"],
                        locationCorrect1: this.props.currentData.content[0].correct
                    })
                    break;
                case 2:
                    this.setState({
                        locationAnswer1: this.props.currentData.content[0].answer,
                        locationContentID1: this.props.currentData.content[0]["content-id"],
                        locationCorrect1: this.props.currentData.content[0].correct,
                        locationAnswer2: this.props.currentData.content[1].answer,
                        locationContentID2: this.props.currentData.content[1]["content-id"],
                        locationCorrect2: this.props.currentData.content[1].correct
                    })
                    break;
                case 3:
                    this.setState({
                        locationAnswer1: this.props.currentData.content[0].answer,
                        locationContentID1: this.props.currentData.content[0]["content-id"],
                        locationCorrect1: this.props.currentData.content[0].correct,
                        locationAnswer2: this.props.currentData.content[1].answer,
                        locationContentID2: this.props.currentData.content[1]["content-id"],
                        locationCorrect2: this.props.currentData.content[1].correct,
                        locationAnswer3: this.props.currentData.content[2].answer,
                        locationContentID3: this.props.currentData.content[2]["content-id"],
                        locationCorrect3: this.props.currentData.content[2].correct
                    })
                    break;
                case 4:
                    this.setState({
                        locationAnswer1: this.props.currentData.content[0].answer,
                        locationContentID1: this.props.currentData.content[0]["content-id"],
                        locationCorrect1: this.props.currentData.content[0].correct,
                        locationAnswer2: this.props.currentData.content[1].answer,
                        locationContentID2: this.props.currentData.content[1]["content-id"],
                        locationCorrect2: this.props.currentData.content[1].correct,
                        locationAnswer3: this.props.currentData.content[2].answer,
                        locationContentID3: this.props.currentData.content[2]["content-id"],
                        locationCorrect3: this.props.currentData.content[2].correct,
                        locationAnswer4: this.props.currentData.content[3].answer,
                        locationContentID4: this.props.currentData.content[3]["content-id"],
                        locationCorrect4: this.props.currentData.content[3].correct
                    })
                    break;
                case 5:
                    this.setState({
                        locationAnswer1: this.props.currentData.content[0].answer,
                        locationContentID1: this.props.currentData.content[0]["content-id"],
                        locationCorrect1: this.props.currentData.content[0].correct,
                        locationAnswer2: this.props.currentData.content[1].answer,
                        locationContentID2: this.props.currentData.content[1]["content-id"],
                        locationCorrect2: this.props.currentData.content[1].correct,
                        locationAnswer3: this.props.currentData.content[2].answer,
                        locationContentID3: this.props.currentData.content[2]["content-id"],
                        locationCorrect3: this.props.currentData.content[2].correct,
                        locationAnswer4: this.props.currentData.content[3].answer,
                        locationContentID4: this.props.currentData.content[3]["content-id"],
                        locationCorrect4: this.props.currentData.content[3].correct,
                        locationAnswer5: this.props.currentData.content[4].answer,
                        locationContentID5: this.props.currentData.content[4]["content-id"],
                        locationCorrect5: this.props.currentData.content[4].correct
                    })
                    break;
                default:
                    console.log("Case not found");
                    break;
            }
        }
        if ((this.props.currentData.x_coords !== undefined) && (this.props.currentData.y_coords !== undefined)) {
            this.setState({
                locationLongitude: this.props.currentData.x_coords,
                locationLatitude: this.props.currentData.y_coords
            })
        }
        if (this.props.currentData.directions !== undefined) {
            this.setState({
                locationDirections: this.props.currentData.directions
            })
        }

    }

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
        console.log("HANDLE INPUT CHANGE I LocationForm.js")
        //här lyssnar vi på förändring [name] anpassar sig till name i varje inputfält. 
        //Lite annorlunda om man använder annat än type="text/number" men går att lösa förstås
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const value = target.value;
        const name = target.name;

        console.log("Target")
        console.log(target)
        console.log("Value")
        console.log(value)
        console.log("Name")
        console.log(name)

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
        let tempContentArray = [{
            "content-id": this.state.locationContentID1,
            "answer": this.state.locationAnswer1,
            "correct": this.state.locationCorrect1
        },
        {
            "content-id": this.state.locationContentID2,
            "answer": this.state.locationAnswer2,
            "correct": this.state.locationCorrect2
        },
        {
            "content-id": this.state.locationContentID3,
            "answer": this.state.locationAnswer3,
            "correct": this.state.locationCorrect3
        },
        {
            "content-id": this.state.locationContentID4,
            "answer": this.state.locationAnswer4,
            "correct": this.state.locationCorrect4
        },
        {
            "content-id": this.state.locationContentID5,
            "answer": this.state.locationAnswer5,
            "correct": this.state.locationCorrect5
        }]
        let contentArray = []
        tempContentArray.forEach(item => {
            if(item["content-id"]){
                contentArray.push(item);
            }
        });
        let data = {
            "location-update": {
                "location-id": this.props.currentData.location_id,
                "name": this.state.locationName,
                "text_info": this.state.locationInfo,
                "qr": "",
                "x_coords": this.state.locationLongitude,
                "y_coords": this.state.locationLatitude,
                "directions": this.state.locationDirections,
                "content": contentArray
            }
        }
        //this.props.callUpdateLocation(data);

        //alert('A value was submitted: ' + this.state.locationName + ' AND: ' + this.state.locationInfo + ' AND: ' + this.state.locationImage + ' AND: ' + this.state.locationVideo + ' AND: ' + this.state.locationLongitude + ' AND: ' + this.state.locationLatitude + ' AND: ' + this.state.locationDirections + ' AND: ' + this.state.locationAnswer1 + ' AND: ' + this.state.locationAnswer2 + ' AND: ' + this.state.locationAnswer3);
        alert('DATA OBJEKT: ' + data["location-update"]["location-id"] + ' AND: ' + data["location-update"].name + ' AND: ' + data["location-update"].text_info + ' AND: ' + data["location-update"].x_coords + ' AND: ' + data["location-update"].y_coords + ' AND: ' + data["location-update"].directions + ' AND: ' + data["location-update"].content[4].answer);
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
                        <div className='row'>
                        <LocationFormAnswers
                            data={this.state}
                            content={this.props.currentData.content}
                            handleInputChange={this.handleInputChange} />
                        </div>
                        <div className='row'>
                            <span onClick={this.handleAddAnswer}>
                                Lägg till svar
                            </span>
                        </div>
                    </fieldset>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}