import React, { Component } from 'react';
import M from 'materialize-css';
import axios from 'axios';

export default class LocationFormAnswers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationID: this.props.data.locationID,
            content: [],
            status: true
        }
        console.log("CHILD")
        console.log(this.props.content)

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
    }
    componentDidMount() {
        M.updateTextFields();
        if (this.props.content.length !== 0) {
            this.setState({ content: this.props.content })
        } else {
            this.setState({ content: [] })
        }
    }

    fetchUpdatedAnswerArray(locationID) {
        console.log("FETCHING UPDATED ANSWER ARRAY")
        /**
         * API-call to fetch an updated array of answers 
         */
        var url = "/moderator/location/content/?locationId=" + locationID;
        var config = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                this.setState({ content: response.data.content })

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */
        this.props.handleInputChange(event);
    }
    handleAddAnswer(locationID) {
        //this.props.handleAddAnswer(locationID)

        /**
     * API-call to add 1 answer 
     */
        console.log("ADDANSWER")
        console.log(locationID)
        var data = JSON.stringify(
            {
                "location-update": {
                    "location-id": locationID,
                    "content": [{
                        "answer": "",
                        "correct": false,
                        "content-id": null
                    }]
                }
            }
        );

        var config = {
            method: "patch",
            url: "/moderator/location",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                this.fetchUpdatedAnswerArray(locationID)

            })
            .catch(function (error) {
                console.log(error.response.data);
            });

    }

    handleRemoveAnswer(locationID, contentID) {

        this.props.handleRemoveAnswer(locationID, contentID)
    }

    render() {
        console.log("ANSWER RENDER")
        console.log(this.state.content)
        let toReturn;
        let toReturnArray = [];
        if (this.state.content.length !== 0) {

            let j = 1;
            this.state.content.forEach(item => {

                let inputName = "locationAnswer" + j.toString();
                let inputValue = this.props.data[inputName];
                let checkboxName = "locationCorrect" + j.toString();
                let getCheckboxValue = this.props.data[checkboxName];
                let setChecked = "checked";
                let contentID = item["content-id"];
                console.log("CONTENT ID HÄR")
                console.log(contentID)

                if (getCheckboxValue !== true) {
                    setChecked = ""
                }

                toReturn = (
                    <div key={contentID} className="row">
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
                        <span className='col s1 right' onClick={() => this.handleRemoveAnswer(this.state.locationID, contentID)}> <i className="material-icons">delete_forever</i></span>
                    </div>
                );
                toReturnArray.push(toReturn);

                j++;
            }
            )
        };

        return (<>
            {[...toReturnArray].map((answer) => (
                answer
            ))}
            {(() => {
                if (this.state.content.length <= 4) {
                    return (
                        <div onClick={() => this.handleAddAnswer(this.state.locationID)}>Lägga till här</div>
                    )
                }
            })()}
        </>
        )
    }
}

/*

 {[...andThis].map((html) => (
                                    html
                                ))}
{
                (() => {
                    if (this.state.content !== undefined) {
                        let contentLength = this.state.content.length
                        if ((this.state.content.length !== 0) && (this.state.content.length <= contentLength)) {
                            let i = 0;
                            let renderThis = null;
                            let andThis = []
                            console.log("RENDERFUNKTIONEN FÖRSTA");
                            console.log(this.props.content.length)
                            this.state.content.forEach(element => {
                                //måste rensa arrayen här på tomma objekt innan rendering
                                console.log("RENDER LOOP")
                                console.log(element)
                                //if (element !== undefined) {
                                    i++;
                                    let inputName = "locationAnswer" + i.toString();
                                    let inputValue = this.props.data[inputName];
                                    let checkboxName = "locationCorrect" + i.toString();
                                    let getCheckboxValue = this.props.data[checkboxName];
                                    let setChecked = "checked";
                                    let contentID = "locationContentID" + i.toString();
                                    console.log("RENDERFUNKTIONEN");
                                    console.log(this.props.data[contentID]);
                                    if (getCheckboxValue !== true) {
                                        setChecked = ""
                                    }
                                    if (element["content-id"] !== "") {
                                        renderThis = (
                                            <div key={this.props.data[contentID]} className="row">
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
                                                <span className='col s1 right' onClick={() => this.handleRemoveAnswer(this.props.data[contentID])}> <i className="material-icons">delete_forever</i></span>
                                            </div>
                                        )
                                        andThis.push(renderThis);
                                    }
                                //}
                            });
                            return (<>
                                {[...andThis].map((html) => (
                                    html
                                ))}
                            </>
                            )
                        }
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
            */