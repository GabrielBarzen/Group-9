import React, { Component } from 'react';
import QRCode from 'qrcode';

export default class LocationFormUseQR extends Component {

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
        console.log("KOLLA HÄR");
        console.log(this.props.data.location_id)
        console.log(this.props.data.name)

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
                    <div className='col s10 offset-s1 center-align'>
                        <i>Plats: <p>{this.state.name}</p></i>
                        <img src={this.state.qrCode} alt='QR Code' />
                    </div>
                    <div className="divider col s10 offset-s1" style={{ 'margin-top': '1rem' }}></div>
                </div>


            </>
        )
    }
}
