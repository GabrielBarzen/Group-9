import React, { Component } from 'react';

export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        console.log(props.currentData)

        //Här definierar vi alla förifyllda värden baserat på props

        this.state = {
            locationName: props.currentData.name,
            locationInfo: props.currentData.text_info,
            locationImage: 'BILD URL HÄR',
            locationVideo: 'Video URL HÄR',
            locationDirections: 'Go left then turn back',
            locationLongitude: 'Longitud här',
            locationLatitude: 'Latitud här'
        };

        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeoLocation = this.handleGeoLocation.bind(this);
    }

    handleNewQuestion() {
        /**
         * Add a new question
         */

    }

    handleGeoLocation() {
        /**
         * fetches geolocation data Longitude and Latitude and adds the coords to the current state-object
         */
        alert("Denna knapp ska trigga hämtning av geodata");
    }

    handleInputChange(event) {
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
                "content": [
                ]
            }
        }
        this.props.callUpdateLocation(data);

        alert('A value was submitted: ' + this.state.locationName + ' AND: ' + this.state.locationInfo + ' AND: ' + this.state.locationImage + ' AND: ' + this.state.locationVideo + ' AND: ' + this.state.locationLongitude + ' AND: ' + this.state.locationLatitude);
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
                    <label>
                        Lägg till bild
                        <input
                            className='blue lighten-4'
                            name="locationImage" type="text"
                            value={this.state.locationImage}
                            onChange={this.handleInputChange} />

                    </label>

                    <label>
                        Lägg till video
                        <input
                            className='blue lighten-4'
                            name="locationVideo" type="text"
                            value={this.state.locationVideo}
                            onChange={this.handleInputChange} />

                    </label>
                    <label>
                        Vägbeskrivning
                        <input
                            className='blue lighten-4'
                            name="locationVideo" type="text"
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
                        <span className="button" onClick={this.handleGeoLocation}>Hämta koordinater</span>
                    </fieldset>
                    <fieldset>
                        <span onClick={this.handleNewQuestion}>
                            Add question
                        </span>
                    </fieldset>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}