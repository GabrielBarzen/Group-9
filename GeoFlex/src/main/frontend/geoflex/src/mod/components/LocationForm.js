import React, { Component } from 'react';
import LocationFormAnswers from './LocationFormAnswers';
import LocationFormMedia from './LocationFormMedia';
import LocationFormUseQR from './LocationFormUseQR';
import ModGeolocate from './ModGeolocate';

export default class LocationForm extends Component {
    /**
     * class component to handle and render the form where a quiz is edited
     * constructor handles state and bindings for method, prefilled values is set through props from parent component
     */
    constructor(props) {
        super(props);

        this.state = {
            locationName: this.props.currentData.name,
            locationInfo: this.props.currentData.text_info,
            locationID: this.props.currentData.location_id,
            locationMediaUrl: this.props.currentData.media[0].mediaURL,
            locationMediaType: "",
            locationMediaExternal: this.props.currentData.media[0].externalMedia,
            locationUseQR: this.props.currentData.qr,
            locationDirections: this.props.currentData.directions,
            locationLongitude: this.props.currentData.x_coords,
            locationLatitude: this.props.currentData.y_coords,

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
            locationCorrect4: ""
        };

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeoLocation = this.handleGeoLocation.bind(this);
        this.handleContentIDState = this.handleContentIDState.bind(this);
        this.handleMediaOptions = this.handleMediaOptions.bind(this);
        this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
    }
    componentDidMount() {
        /**
         * react method to handle logic before component renders
         */
        if (this.props.currentData.media[0].mediaType === "video") {
            this.setState({ locationMediaType: false })
        } else if (this.props.currentData.media[0].mediaType === "image") {
            this.setState({ locationMediaType: true })
        } else {
            this.setState({ locationMediaType: false })
        }

        if (this.props.currentData.media[0].externalMedia === false) {
            this.setState({ locationMediaExternal: false })
        } else if (this.props.currentData.media[0].externalMedia === true) {
            this.setState({ locationMediaExternal: true })
        }

        let contentLength = this.props.currentData.content.length
        if (this.props.currentData.content.length !== 0) {
            /**
             * since the amount of answers can vary in numbers for each question a switch will handle each case to set prefilled values, if any
             */
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

                default:
                    console.log("Case not found");
                    break;
            }
        }
    }

    handleMediaOptions(mediaType, externalMedia) {
        /**
             * method to change state of locationMediaType and locatioinMediaExternal
             */
        this.setState({
            locationMediaType: mediaType,
            locationMediaExternal: externalMedia
        })
    }

    handleContentIDState(content) {
        /**
         * method to create unique keys for content array
         */
        let i = 1;

        content.forEach(item => {
            let stateKey = "locationContentID" + i.toString();
            this.setState({ [stateKey]: item["content-id"] })
            i++
        });

    }

    handleAddAnswer(locationID) {
        /**
         * Add a new answer
         */

        this.props.callAddAnswer(locationID);
    }

    handleRemoveAnswer(locationID, contentID) {
        /**
         * Remove an answer
         */
        this.props.callRemoveAnswer(locationID, contentID)
    }

    handleGeoLocation(long, lat) {
        /**
         * fetches geolocation data Longitude and Latitude and adds the coords to the current state-object
         */
        this.setState({
            locationLongitude: long,
            locationLatitude: lat
        });

    }

    handleInputChange(event) {
        /**
    * method to handle the various input fields and conditions for the media switches 
    */
        function youtubeUrlToEmbedUrl(youtubeUrl) {
            // First, check if the URL is a valid YouTube URL
            var youtubeRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/.+$/;
            if (!youtubeRegex.test(youtubeUrl)) {
                return false;
            }

            // If the URL is a valid YouTube URL, then extract the video ID
            var videoId = youtubeUrl.split("v=")[1];
            var ampersandIndex = videoId.indexOf("&");
            if (ampersandIndex !== -1) {
                videoId = videoId.substring(0, ampersandIndex);
            }

            // Use the video ID to create the embed URL
            var embedUrl = "https://www.youtube.com/embed/" + videoId;

            return embedUrl;
        }

        //här lyssnar vi på förändring [name] anpassar sig till name i varje inputfält. 
        //Lite annorlunda om man använder annat än type="text/number" men går att lösa förstås
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        if ((name === "locationMediaExternal") || (name === "locationMediaType")) {
            this.setState({ locationMediaUrl: "" })
        }
        if (name === "locationName") {
            this.props.handleChange(value)
        }
        if (name === "locationMediaUrl") {
            if (this.state.locationMediaExternal === true) {
                if (this.state.locationMediaType === false) {
                    let youtubeURL = youtubeUrlToEmbedUrl(value)
                    if (youtubeURL !== false) {
                        this.setState({ [name]: youtubeURL })
                    }
                }
            }
        }


        //converts the image url in case faulty when url is copied from the internet
    }

    setParentMediaUrl(mediaPath) {
        /**
     * method to be sent to locationFormMedia 
     */
        if (this.state.locationMediaUrl === "") {
            this.setState({ locationMediaType: "video" })
        }
        this.setState({ locationMediaUrl: mediaPath })
    }

    handleSubmit(event) {
        event.preventDefault();

        /*
        method to build the data object and send it to API-call to be saved to database
        */


        if (this.state.locationUseQR === false) {
            this.setState({ locationDirections: "" })
        } else if (this.state.locationUseQR === true) {
            this.setState({ locationLatitude: "", locationLongitude: "" })
        }

        let mediaType;

        if (this.state.locationMediaType === false) {
            mediaType = "video"
        } else if (this.state.locationMediaType === true) {
            mediaType = "image"
        }
        if (this.state.locationMediaUrl.length === 0) {
            mediaType = "";
        }

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
        }
        ]
        let contentArray = []
        tempContentArray.forEach(item => {
            if (item["content-id"]) {
                contentArray.push(item);
            }
        });

        let data = {
            "location-update": {
                "location-id": this.props.currentData.location_id,
                "name": this.state.locationName,
                "text_info": this.state.locationInfo,
                "qr": this.state.locationUseQR,
                "x_coords": this.state.locationLongitude,
                "y_coords": this.state.locationLatitude,
                "directions": this.state.locationDirections,
                "media": [{
                    "mediaURL": this.state.locationMediaUrl,
                    "mediaType": mediaType,
                    "externalMedia": this.state.locationMediaExternal
                }],
                "content": contentArray
            }
        }

        this.props.callUpdateLocation(data);
    }



    render() {
        /**
         * react function to render html and other components
         */

        return (
            <div className='col s12'>
                <h5>Redigera plats</h5>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Titel
                        <input
                            className='grey lighten-3'
                            name="locationName" type="text"
                            value={this.state.locationName}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Platsinformation
                        <textarea
                            className='grey lighten-3 materialize-textarea'
                            name="locationInfo"
                            value={this.state.locationInfo}
                            onChange={this.handleInputChange} />
                    </label>
                    <LocationFormMedia
                        locationID={this.props.currentData.location_id}
                        locationMediaUrl={this.state.locationMediaUrl}
                        locationMediaType={this.state.locationMediaType}
                        locationMediaExternal={this.state.locationMediaExternal}
                        handleInputChange={this.handleInputChange}
                        handleMediaOptions={this.handleMediaOptions}
                        setParentMediaUrl={this.setParentMediaUrl}
                    />
                    <div className='row'>
                        <div className='col 12'>
                            <br />
                            <i>Hur ska deltagarna hitta till platsen? Ska en QR-kod läsas in
                                eller ska deltagarna ta sig till en plats baserat på kordinater?
                            </i>
                            <br />
                            <br />
                            <div className="switch row">
                                <div className='col 12'>
                                    <label>
                                        Kordinater
                                        <input type="checkbox"
                                            name="locationUseQR"
                                            checked={this.state.locationUseQR}
                                            onChange={this.handleInputChange}
                                        />
                                        <span className="lever"></span>
                                        QR
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(() => {
                        if (this.state.locationUseQR === true) {
                            return (
                                <LocationFormUseQR
                                    data={this.state}
                                    routeID={this.props.routeID}
                                    handleInputChange={this.handleInputChange}
                                />
                            )
                        } else if (this.state.locationUseQR === false) {
                            return (
                                <ModGeolocate
                                    data={this.state}
                                    handleGeoLocation={this.handleGeoLocation}
                                    handleInputChange={this.handleInputChange} />
                            )
                        }
                    })()}
                    <fieldset style={{ 'border': '0px', 'margin': '0px', 'padding': '0px' }}>
                        <div className=''>
                            <LocationFormAnswers
                                data={this.state}
                                content={this.props.currentData.content}
                                handleInputChange={this.handleInputChange}
                                handleAddAnswer={this.handleAddAnswer}
                                handleRemoveAnswer={this.handleRemoveAnswer}
                                handleContentIDState={this.handleContentIDState} />
                        </div>
                    </fieldset>
                    <input type="submit" value="Spara" className="waves-effect waves-light btn green lighten-1" style={{ 'margin-bottom': '1rem' }} />
                </form>
            </div>
        )
    }
}