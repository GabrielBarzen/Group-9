import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';



export default class LocationFormMedia extends Component {
    /**
     * Todo: 
     *          kommentera kod
     *          Fixa riktig knapp i html
     */
    constructor(props) {
        super(props);
        this.state = {
            locationID: this.props.locationID,
            selectedFile: null,
            mediaUrl: null
        }

        this.handleSaveMediaLocation = this.handleSaveMediaLocation.bind(this);
        this.handleGetMediaLocation = this.handleGetMediaLocation.bind(this);


    }

    onFileChange = event => {


        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        alert("SETSTATE" + event.target.files[0].name)

    };

    handleGetMediaLocation() {

        var myData;
        var config = {
            method: 'get',
            url: '/moderator/location/file/retrieve?locationId=' + this.state.locationID,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert("GETMEDIA: " + response.data)
                myData = "http://localhost:8080/" + response.data
                setImage(myData)
            })
            .catch(function (error) {
                console.log(error);
                myData = "https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_.jpg";
                setImage(myData)
            });

            var setImage = (imagePath) => {
                this.setState({ mediaUrl: imagePath});
            }
    }



    handleSaveMediaLocation(event) {
        event.preventDefault();
        alert("HANDLESAVE MEDIA  " + this.state.selectedFile)


        //var FormData = require('form-data');
        //var fs = require('fs');
        var data = new FormData();

        data.append('file', this.state.selectedFile);

        var config = {
            method: 'post',
            url: '/moderator/location/file/upload?locationId=' + this.state.locationID,
            headers: {
                "Content-Type": "multipart/form-data"
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

    render() {
        return (
            <fieldset>
                <label>
                    Lägg till bild

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Bild</span>
                            <input type="file"
                                className='blue lighten-4'
                                onChange={this.onFileChange}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                        <img src={this.state.mediaUrl} alt={this.state.mediaUrl}/>


                    </div>
                    <p onClick={this.handleSaveMediaLocation}>Spara bild</p>
                </label>
                <p onClick={this.handleGetMediaLocation}>Hämta bild</p>

            </fieldset>
        )
    }
}