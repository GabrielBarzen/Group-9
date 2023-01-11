import React, { Component } from 'react';
import LocationFormMedia from './LocationFormMedia';

export default class ModRouteMedia extends Component {

    constructor(props) {
        super(props);
        //Här definierar vi alla förifyllda värden baserat på props

        console.log("ModRouteMedia")
        console.log(this.props.mediaData.mediaUrl)
        this.state = {
            
            routeID: this.props.routeID,
            locationMediaUrl: this.props.mediaData.mediaUrl,
            locationMediaType: "",
            locationMediaExternal: this.props.mediaData.externalMedia,
            
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMediaOptions = this.handleMediaOptions.bind(this);
        this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
    }

    componentDidMount() {
        console.log("ModRouteMedia")
        console.log(this.props.mediaData)
        if (this.props.mediaData.mediaType === "video") {
            this.setState({ locationMediaType: false })
        } else if (this.props.mediaData.mediaType === "image") {
            this.setState({ locationMediaType: true })
        } else {
            this.setState({ locationMediaType: false })
        }

        if (this.props.mediaData.externalMedia === false) {

            this.setState({ locationMediaExternal: false })
        } else if (this.props.mediaData.externalMedia === true) {
            this.setState({ locationMediaExternal: true })
        }
    }

    handleMediaOptions(mediaType, externalMedia) {
        console.log("HANDLE MEDIA OPTIONS")
        this.setState({
          locationMediaType: mediaType,
          locationMediaExternal: externalMedia
        })
      }

      setParentMediaUrl(mediaPath) {
        console.log("PARENTMEDIAURL")
        if (this.state.locationMediaUrl === "") {
          this.setState({ locationMediaType: "video" })
        }
        this.setState({ locationMediaUrl: mediaPath })
      }

      handleInputChange(event) {
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
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        this.setState({ [name]: value });
        if (name === "title") {
          this.props.handleChange(value)
        }
    
        if ((name === "locationMediaExternal") || (name === "locationMediaType")) {
          this.setState({ locationMediaUrl: "" })
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
    
      }

  render() {
    return (
      <>
        
        <div className='container'>
      <LocationFormMedia
            routeID={this.state.routeID}
            locationMediaUrl={this.state.locationMediaUrl}
            locationMediaType={this.state.locationMediaType}
            locationMediaExternal={this.state.locationMediaExternal}
            handleInputChange={this.handleInputChange}
            handleMediaOptions={this.handleMediaOptions}
            setParentMediaUrl={this.setParentMediaUrl}
          />
          
          </div>
      </>
    )
  }
}
