import React, { Component } from 'react';
import M from 'materialize-css';

export default class LocationFormAnswers extends Component {
    constructor(props) {
        super(props)
        console.log("CHILD")
        console.log(this.props.data.locationAnswer1)

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
    }
    componentDidMount() {
        M.updateTextFields();
    }

    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        this.props.handleInputChange(event);
    }
    handleAddAnswer(){
        this.props.handleAddAnswer()
    }
    handleRemoveAnswer(){
        this.props.handleRemoveAnswer(this.props.data["content-id"])
    }

    render() {
        return (<>
            {
                (() => {
                    let contentLength = this.props.content.length
                    if ((this.props.content.length !== 0) && (this.props.content.length <= contentLength)) {
                        let i = 0;
                        let renderThis = null;
                        let andThis = []

                        this.props.content.forEach(element => {

                            i++;
                            let inputName = "locationAnswer" + i.toString();
                            let inputValue = this.props.data[inputName];
                            let checkboxName = "locationCorrect" + i.toString();
                            let getCheckboxValue = this.props.data[checkboxName];
                            let setChecked = "checked";
                            let keyValue = "locationID" + i.toString();
                            if (getCheckboxValue !== true) {
                                setChecked = ""
                            }
                            renderThis = (
                                <div key={keyValue} className="row">
                                    <label className='col s9'>
                                        Fråga
                                        <input className="blue lighten-4"
                                            name={inputName}
                                            type="text"
                                            value={inputValue}
                                            onChange={this.onFieldChange.bind(this)} />
                                    </label>
                                    <label className='col s2' htmlFor={checkboxName}>


                                        <input className='text-black'
                                            id={checkboxName}
                                            name={checkboxName}
                                            checked={setChecked}
                                            type="checkbox"

                                            onChange={this.onFieldChange.bind(this)} />
                                        <span>Rätt svar</span>
                                    </label>
                                    <span className='col s1 right' onClick={this.handleRemoveAnswer}> <i className="material-icons">delete_forever</i></span>
                                </div>
                            )
                            andThis.push(renderThis);
                            
                        });
                        return (<>
                            {[...andThis].map((html) => (
                                html
                            ))}
                        </>
                        )
                    }
                })()
            }
            {
                (() => {
                    if (this.props.content.length <= 4) {
                        //försökte få till knappen här men ska nog lägga den i en egen if sats helt enkelt.
                        return (
                            <div className='row' onClick={this.handleAddAnswer}><p>Lägg till ett svarsalternativ</p></div>
                        )
                    }
                })()
            }

        </>
        )
    }
}