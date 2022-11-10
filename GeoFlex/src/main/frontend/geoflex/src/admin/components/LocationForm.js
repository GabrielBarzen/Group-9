import React, { Component } from 'react';

export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        //Här definierar vi alla förifyllda värden baserat på props
        this.state = {
          formFieldOne: "hoppla",
          formFieldTwo: 2
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleInputChange(event) {
        //här lyssnar vi på förändring [name] anpassar sig till name i varje inputfält. 
        //Lite annorlunda om man använder annat än type="text/number" men går att lösa förstås
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
      }

    handleSubmit(event) {
        event.preventDefault();

        /*
        här bygger vi objektet som ska till databasen 
        och anropar sedan funktionen där API-anropet ligger och skickar med objektet
        just nu får man bara en alert med de värden man fyllt i
        */

        alert('A value was submitted: ' + this.state.formFieldOne + 'AND: ' + this.state.formFieldTwo);
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        min label
                        
                        <input
                            name="formFieldOne" type="text"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange} />
                    </label>
                    
                    <label>
                        min andra label
                        <input
                            name="formFieldTwo" type="text"
                            value={this.state.numberOfGuests}
                            onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}