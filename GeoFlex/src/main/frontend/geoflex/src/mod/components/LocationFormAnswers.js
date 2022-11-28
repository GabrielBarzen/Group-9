import React, { Component } from 'react'

export default class LocationFormAnswers extends Component {
    constructor(props){
        super(props)
        console.log("CHILD")

        console.log(this.props.content)

        //this.handleRenderAnswers = this.handleRenderAnswers.bind(this);
    }

    onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        alert("onfieldchange")
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.handleInputChange(fieldName, fieldValue);
    }

    /*
    handleRenderAnswers() {
        let i = 0;
        this.props.currentData.content.forEach(element => {
            i++;
            let inputName = "locationContentID" + element["content-id"];
            let inputValue = "locationAnswer" + i.toString();
            return (
                <label>
                    Fråga {i}
                    <input
                        className='blue lighten-4'
                        name={inputName} type="text"
                        value={this.state[inputValue]}
                        onChange={this.handleInputChange} />
                </label>
            )
        });
    }*/
  render() {
    return (
        <label>
        Fråga 
        <input
            className='blue lighten-4'
            name="lcoationAnswer1" type="text"
            value="hejsan"
            onChange={this.onFieldChange.bind(this)} />
    </label>
    )
  }
}
