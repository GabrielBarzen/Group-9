import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default class LocationFormMedia extends Component {
    /**
     * this.state.mediaType: false === video; true === img
     * Todo: 
     *          kommentera kod
     *          Fixa riktig knapp i html
     */
    constructor(props) {
        super(props);
        this.state = {
            locationID: props.locationID,
            mediaExternal: props.locationMediaExternal,
            mediaUrl: props.locationMediaUrl,
            mediaType: this.props.locationMediaType
        }

        this.handleSaveMediaLocation = this.handleSaveMediaLocation.bind(this);
        this.handleGetMediaLocation = this.handleGetMediaLocation.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        alert("SETSTATE" + event.target.files[0].name)

    };

    handleGetMediaLocation() {
        console.log("getMediaURL")

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

        const setImage = (imagePath) => {
            this.setState({ mediaUrl: imagePath });

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
                fetchMediaURL();
            })
            .catch(function (error) {
                console.log(error);
                fetchMediaURL();
            });

        const fetchMediaURL = () => {
            this.handleGetMediaLocation();
        }
    }

    handleSwitch(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ mediaExternal: value })
    }
    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        this.props.handleInputChange(event);
    }



    render() {
        let renderImage = (<>
            <div className=""><p>Förhandsvy Media</p><img className="responsive-img" src={this.state.mediaUrl} alt="uppladdad bild" /></div>
        </>)

        let renderExternalVideo = (<>
            <div className="">
                <p>Förhandsvy Media</p>
                <div className="video-container">
                    <iframe width={853} height={480} src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
            </div>
        </>);

        let renderInternalVideo = (<><div className="">
            <p>Förhandsvy Media</p>
            <video className="responsive-video" controls>
                <p>Förhandsvy Media</p>
                <source src={this.state.mediaUrl} type="video/mp4" />
            </video>
        </div>
        </>)

        let noMedia = (<>
        <p>Det finns ingen media kopplad till detta quiz.</p>
        </>)

        let renderMedia;

        console.log("MEDIA RENDER")
        console.log(this.state.mediaExternal)
        console.log("MEDIATYPE")
        console.log(this.state.mediaType)
        if (this.state.mediaExternal === true) {
            if (this.state.mediaType === "image") {
                console.log("IF: EXTERNAL IMAGE")
                renderMedia = renderImage;

            } else if (this.state.mediaType === "video") {
                console.log("IF: EXTERNAL VIDEO")
                renderMedia = renderExternalVideo;
                
            } else if(this.state.mediaType === ""){
                console.log("IF: EXTERNAL NOMEDIA")
                renderMedia = noMedia;
            }
        } else if (this.state.mediaExternal === false) {            
            if (this.state.mediaType === "image") {
                console.log("IF ELSE: INTERNAL IMAGE")
                renderMedia = renderImage
                
            } else if (this.state.mediaType === "video") {
                console.log("IF ELSE: INTERNAL VIDEO")
                renderMedia = renderInternalVideo
                
            } else if(this.state.mediaType === ""){
                console.log("IF ELSE: INTERNAL NOMEDIA")
                renderMedia = noMedia;
            }
        } 

        return (
            <fieldset>
                <div className="switch row">
                    <span>Media</span>
                    <label>

                        Ladda upp egen media
                        <input type="checkbox"
                            name="mediaExternal"
                            checked={this.state.mediaExternal}
                            onChange={this.handleSwitch}
                        />
                        <span className="lever"></span>
                        Använd extern källa

                    </label>
                </div>
                <div className="switch row">
                    <span>Media typ:</span>
                    <label>

                        Video
                        <input type="checkbox"
                            name="locationMediaType"
                            checked={this.props.locationMediaType}
                            onChange={this.onFieldChange}
                        />
                        <span className="lever"></span>
                        Bild

                    </label>
                </div>

                <label>
                    Lägg till bild

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Välj fil</span>
                            <input type="file"
                                className='blue lighten-4'
                                onChange={this.onFileChange}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>


                    </div>
                    <p onClick={this.handleSaveMediaLocation}>Spara bild</p>
                </label>
                <div className="">
                {renderMedia}
                </div>
            </fieldset>
        )
    }
}
