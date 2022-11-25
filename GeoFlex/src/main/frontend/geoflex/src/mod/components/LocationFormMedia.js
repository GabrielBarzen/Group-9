import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';



export default class LocationFormMedia extends Component {
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

        var config = {
            method: 'get',
            url: '/moderator/location/file/retrieve?locationId=' + this.state.locationID,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert("GETMEDIA: " + response.data)
                let myData = "http://localhost:8080/" + response.data
                setState({ mediaUrl: myData })

            })
            .catch(function (error) {
                console.log(error);
            });




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

                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Bild</span>
                            <input type="file"
                                className='blue lighten-4'
                                onChange={this.onFileChange}
                            />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
                        <img src={this.state.mediaUrl} />



                    </div>
                    <p onClick={this.handleSaveMediaLocation}>Spara bild</p>
                </label>
                <p onClick={this.handleGetMediaLocation}>Hämta bild</p>



                <label>
                    Lägg till video
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Video</span>
                            <input type="file"
                                className='blue lighten-4'
                            />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
                    </div>

                </label>
            </fieldset>
        )
    }
}
