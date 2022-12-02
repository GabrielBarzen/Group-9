import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';


export default function LocationFormUseQR(props) {
    /*const qrValue = {
        "routeID": props.routeID,
        "locationID": props.data.locationID,
        "locationName": props.data.locationName,
        "marker": true
    }*/

    const [url, setUrl] = useState('');
    const [qrCode, setQrCode] = useState('');


    useEffect(() => {
        setUrl([{
            "routeID": props.routeID,
            "locationID": props.data.locationID,
            "locationName": props.data.locationName,
            "marker": true
        }])

        const generateQR = () => {
            QRCode.toDataURL(url, (err, url) => {
                if (err) return console.error(err)

                console.log(url)
                setQrCode(url)
            })
        }
        generateQR(url)
    }, [url, setUrl, props.routeID, props.data.locationID, props.data.locationName]);

    function onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        props.handleInputChange(event);
    }

    return (<>
        <div className='row'>
            <label className='col s9 left'>
                Vägbeskrivning
                <input
                    className='blue lighten-4'
                    name="locationDirections" type="text"
                    value={props.data.locationDirections}
                    onChange={onFieldChange} />

            </label>
            </div>
            <div className='row'>
                <div className='col s3'>
                    <img src={qrCode} alt='QR Code' />
                </div>
            </div>
            </>

    )
}
