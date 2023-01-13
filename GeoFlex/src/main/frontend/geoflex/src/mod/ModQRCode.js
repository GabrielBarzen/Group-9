import React, { Component } from 'react';
import QRCode from 'qrcode';

export default class LocationFormUseQR extends Component {
/**
 * class component that handles creation and rendering of qrcodes to print
 * constructor sets states and binds methods used
 */
    constructor(props) {
        super(props)
        this.state = {
            qrCode: '',
            url: {
                "locationID": this.props.data.locationID,
            },
            name: this.props.data.name
        }
        this.generateQR = this.generateQR.bind(this);
    }
    componentDidMount() {
/**
 * react method that runs before render and update states
 */
        this.setState({
            url: [{
                "locationID": this.props.data.location_id,
                "locationName": this.props.data.name

            }]
        })
        var data = this.props.data.location_id.toString();

        this.generateQR(data);
    }

    generateQR(data) {

        QRCode.toDataURL(data, (err, url) => {
            if (err) return console.error(err)
            this.setState({ qrCode: url })
        })
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col s10 offset-s1 center-align' id='printQR'>
                        <i>Plats: <p>{this.state.name}</p></i>
                        <img src={this.state.qrCode} alt='QR Code' id='PrintReadyQR' />
                    </div>
                    <div className="divider col s10 offset-s1" style={{ 'marginTop': '1rem' }}></div>
                </div>
            </>
        )
    }
}
