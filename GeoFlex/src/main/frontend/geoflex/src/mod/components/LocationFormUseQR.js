import React, { Component } from 'react';
import QRCode from 'qrcode';

export default class LocationFormUseQR extends Component {
    /**
     * class component that handles creating a qr code for a quiz and the description to find a location when indoors
     * constructor set states and binds methods used 
     */
    constructor(props) {
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
    componentDidMount() {
        /**
         * react method to handle logic before rendering
         * set data 
         */

        this.setState({
            url: [{
                "routeID": this.props.routeID,
                "locationID": this.props.data.locationID,
                "locationName": this.props.data.locationName,
                "marker": true
            }]
        })
        var data = this.props.data.locationID.toString();

        this.generateQR(data);
    }

    generateQR(data) {
        /**
         * method to generate a qr-code 
         */
        QRCode.toDataURL(data, (err, url) => {
            if (err) return console.error(err)


            this.setState({ qrCode: url })
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
                    <div className='col 12'>
                        <i>Skriv in en vägbeskrivning så deltagarna hittar till
                            QR-koden.</i>
                        <br />
                        <br />
                        <label className='col s12 m6 l5' style={{ 'margin': '0px', 'padding': '0px' }}>
                            Vägbeskrivning
                            <textarea
                                className='grey lighten-3 materialize-textarea'
                                name="locationDirections" type="text"
                                value={this.props.data.locationDirections}
                                onChange={this.onFieldChange}
                                style={{ 'padding': '0.5rem' }}
                            />
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <i>Nedanför är QR-koden för den här platsen.
                            Samtliga QR-koder för alla platser finns
                            att hämta hem längst ned till höger på
                            denna sidan.
                        </i>
                    </div>
                    <div className='col s5 offset-s4'>
                        <img src={this.state.qrCode} alt='QR Code' />
                    </div>
                </div>
            </>
        )
    }
}
