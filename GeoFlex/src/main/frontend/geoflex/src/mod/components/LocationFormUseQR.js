import React from 'react'

export default function LocationFormUseQR(props) {

    function onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        props.handleInputChange(event);
    }
    return (
        <label>
            Vägbeskrivning
            <input
                className='blue lighten-4'
                name="locationDirections" type="text"
                value={props.data.locationDirections}
                onChange={onFieldChange} />

        </label>
    )
}
