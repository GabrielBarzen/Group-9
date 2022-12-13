import React, { Component } from 'react'
import LocationFormMedia from './LocationFormMedia';

export default class LastLocationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.data.name,
      description: this.props.data.text_info,
      locationMediaUrl: props.data.media[0].mediaURL,
      locationMediaType: "",
      locationMediaExternal: props.data.media[0].externalMedia,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMediaOptions = this.handleMediaOptions.bind(this);
    this.setParentMediaUrl = this.setParentMediaUrl.bind(this);
  }

  componentDidMount() {

    if (this.props.data.media[0].mediaType === "video") {
      this.setState({ locationMediaType: false })
    } else if (this.props.data.media[0].mediaType === "image") {
      this.setState({ locationMediaType: true })
    } else {
      this.setState({ locationMediaType: false })
    }

    if (this.props.data.media[0].externalMedia === false) {

      this.setState({ locationMediaExternal: false })
    } else if (this.props.data.media[0].externalMedia === true) {
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
    return (<>
      <label>
        Rubrik
        <input
          className='blue lighten-4'
          name={this.state.name} type="text"
          value={this.state.name}
          onChange={this.handleInputChange} />
      </label>
      <label>
        Innehåll
        <input
          className='blue lighten-4'
          name={this.state.text_info} type="text"
          value={this.state.text_info}
          onChange={this.handleInputChange} />
      </label>
      <LocationFormMedia
        locationID={this.props.data.location_id}
        locationMediaUrl={this.state.locationMediaUrl}
        locationMediaType={this.state.locationMediaType}
        locationMediaExternal={this.state.locationMediaExternal}
        handleInputChange={this.handleInputChange}
        handleMediaOptions={this.handleMediaOptions}
        setParentMediaUrl={this.setParentMediaUrl}
      />
    </>
    )
  }
}
