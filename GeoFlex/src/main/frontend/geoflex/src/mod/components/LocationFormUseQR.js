import React, { Component } from 'react';
import QRCode from'qrcode';

export default class LocationFormUseQR extends Component {

    constructor(props){
        super(props)
        this.state = {
            qrCode: '',
            url: {
                "routeID": this.props.routeID,
                "locationID": this.props.data.locationID,
                "locationName": this.props.data.locationName,
                "marker": true
            }
        }
        this.generateQR = this.generateQR.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }
componentDidMount(){
    
    this.setState({url: [{
        "routeID": this.props.routeID,
        "locationID": this.props.data.locationID,
        "locationName": this.props.data.locationName,
        "marker": true
    }]})
    var segs = [
        { data: this.state.routeID, mode: 'numeric' },
        { data: this.state.locationID, mode: 'numeric' },
        { data: this.state.url.locationName, mode: 'alphanumerical'},
        { data: this.state.url.marker, mode: 'bool'}
      ]
    let test = this.state.url.toString();
    this.generateQR(segs);
}
    
generateQR(segs){
    
    QRCode.toDataURL(segs, (err, url) => {
        if (err) return console.error(err)

        console.log(url)
        this.setState({qrCode: url})
    })
}
    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        this.props.handleInputChange(event);
    }

  render() {
    return (
        <>
        <div className='row'>
            <label className='col s9 left'>
                Vägbeskrivning
                <input
                    className='blue lighten-4'
                    name="locationDirections" type="text"
                    value={this.props.data.locationDirections}
                    onChange={this.onFieldChange} />

            </label>
        </div>
        <div className='row'>
            <div className='col s3'>
                <img src={this.state.qrCode} alt='QR Code' />
            </div>
        </div>
    </>
    )
  }
}
