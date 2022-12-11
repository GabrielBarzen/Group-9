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
            mediaType: this.props.locationMediaType,
            addMedia: false
        }

        this.handleSaveMediaLocation = this.handleSaveMediaLocation.bind(this);
        this.handleGetMediaLocation = this.handleGetMediaLocation.bind(this);
        this.handleMediaOriginSwitch = this.handleMediaOriginSwitch.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
    }
    componentDidMount() {
        if (this.props.locationMediaUrl.length !== 0) {
            this.setState({ addMedia: true })
        }
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        alert("SETSTATE" + event.target.files[0].name)
        this.handleSaveMediaLocation(event);

    };

    setParentMediaUrl(fileUrl){
        this.props.setParentMediaUrl(fileUrl)
    }

    handleGetMediaLocation() {
        console.log("getMediaURL");

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
                console.log("GETMEDIAURL ERROR");
                myData = "https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_.jpg";
                setImage(myData)

            });

        function setImage(imagePath) {
            this.setParentMediaUrl(imagePath);
            //this.setState({ mediaUrl: imagePath });

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

    handleMediaOriginSwitch(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ mediaExternal: value })
    }
    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        console.log("INFIELDCHANGE")
        console.log(event.target.name)
        this.props.handleInputChange(event);
    }



    render() {
        /*
                let externalInput = (<>
                    <input
                        className='blue lighten-4'
                        name="locationMediaUrl" type="text"
                        value={this.state.locationName}
                        onChange={this.onFieldChange}
                    />
                </>)
        */

        let uploadMedia = (<>
            <label>
                Lägg till media

                <div className="file-field input-field">
                    <div className="btn">
                        <span>Välj fil</span>
                        <input type="file"
                            className='blue lighten-4'
                            onChange={this.onFileChange}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" 
                            type="text"
                            name='locationMediaUrl'
                            value="TJOLAHEJ"
                            onChange={this.onFieldChange} />
                    </div>


                </div>
                <p onClick={this.handleSaveMediaLocation}>Spara bild</p>
            </label>
        </>)

        let externalMedia = (<>
            <label>
                Titel
                <input
                    className='blue lighten-4'
                    name="locationMediaUrl" type="text"
                    value={this.props.locationMediaUrl}
                    onChange={this.onFieldChange}
                />
            </label>
        </>)


        let renderImage = (<>
            <div className="">
                <p>Förhandsvy Media</p>
                <img className="responsive-img"
                    src={this.state.mediaUrl}
                    alt="uppladdad bild" />
            </div>
        </>)
//fixa src så den stämmer
        let renderExternalVideo = (<>
            <div className="">
                <p>Förhandsvy Media</p>
                <div className="video-container">
                    <iframe
                        title="external"
                        width={853}
                        height={480}
                        src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0"
                        frameBorder="0"
                        allowFullScreen sandbox="allow-scripts allow-same-origin">
                    </iframe>
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
        let renderInput;
        let renderMediaPreview;

        console.log("MEDIA RENDER")
        console.log(this.state.mediaExternal)
        console.log("MEDIATYPE")
        console.log(this.state.mediaType)
        if (this.state.mediaExternal === true) {
            if (this.state.mediaType === "image") {
                console.log("IF: EXTERNAL IMAGE")
                renderInput = externalMedia;
                renderMediaPreview = renderImage;

            } else if (this.state.mediaType === "video") {
                console.log("IF: EXTERNAL VIDEO")
                renderInput = externalMedia;
                renderMediaPreview = renderExternalVideo;

            } else if (this.state.mediaType === "") {
                console.log("IF: EXTERNAL NOMEDIA")
                renderInput = externalMedia;
                renderMediaPreview = noMedia;
            }
        } else if (this.state.mediaExternal === false) {
            if (this.state.mediaType === "image") {
                console.log("IF ELSE: INTERNAL IMAGE")
                renderInput = uploadMedia;
                renderMediaPreview = renderImage

            } else if (this.state.mediaType === "video") {
                console.log("IF ELSE: INTERNAL VIDEO")
                renderInput = uploadMedia;
                renderMediaPreview = renderInternalVideo

            } else if (this.state.mediaType === "") {
                console.log("IF ELSE: INTERNAL NOMEDIA")
                renderInput = uploadMedia;
                renderMediaPreview = noMedia;
            }
        }

        let mediaSettings = (<>
            <div className="switch row">
                <span>Media</span>
                <label>

                    Ladda upp egen media
                    <input type="checkbox"
                        name="mediaExternal"
                        checked={this.state.mediaExternal}
                        onChange={this.handleMediaOriginSwitch}
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
        </>)

        return (<>
            
            {mediaSettings}
            {renderInput}
            {renderMediaPreview}
        </>)

    }
}


/*


if (this.state.addMedia === false) {
            return (<>
            <div className="switch row">
                                <span>Lägg till media</span>
                                <label>

                                    Nej
                                    <input type="checkbox"
                                        name="addMedia"
                                        checked={this.state.addMedia}
                                        onChange={this.handleAddMediaSwitch}
                                    />
                                    <span className="lever"></span>
                                    Ja

                                </label>
                            </div>
            </>
            )
        } else if (this.state.addMedia === true) {
            }
<fieldset>
                {(() => {
                    if (this.state.addMedia === false) {

                        return (
                            <div className="switch row">
                                <span>Lägg till media</span>
                                <label>

                                    Nej
                                    <input type="checkbox"
                                        name="mediaExternal"
                                        checked={this.state.mediaExternal}
                                        onChange={this.handleMediaOriginSwitch}
                                    />
                                    <span className="lever"></span>
                                    Ja

                                </label>
                            </div>
                        )
                    } else if (this.state.addMedia === true) {

                        return (
                                {addMedia}
                            )
                    }
                })()}
            </fieldset>
*/