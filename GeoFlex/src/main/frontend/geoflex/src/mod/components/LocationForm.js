import React, { Component } from 'react';
import LocationFormMedia from './LocationFormMedia';
import ModGeolocate from './ModGeolocate';

export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        console.log("CURRENTDATA - LOCATION FORM")
        //Location form laddar innan man trycker på edit vilket gör att man ej kan skicka datan.
        console.log(props.locationContent)

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
            locationContent: props.locationContent
        };

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeoLocation = this.handleGeoLocation.bind(this);
        this.handleShowContent = this.handleShowContent.bind(this);
        
    }


    handleShowContent(){
        console.log(this.state.locationID)
        console.log(this.state.locationContent)

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
    */
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
                <p onClick={this.handleShowContent}> kör en gång</p>
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
                    <LocationFormMedia locationID={this.props.currentData.id}/>
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
                        {this.handleShowContent}
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