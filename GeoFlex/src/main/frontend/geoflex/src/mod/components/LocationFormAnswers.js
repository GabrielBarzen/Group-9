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

        this.handleAddAnswer = this.handleAddAnswer.bind(this);
        this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
        this.fetchUpdatedAnswerArray = this.fetchUpdatedAnswerArray.bind(this);
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
                update(response.data.content);


            })
            .catch(function (error) {
                console.log(error);
            });

        const update = (data) => {
            this.setState({ content: data })
            this.props.handleContentIDState(data)
            this.forceUpdate()
        }
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
                fetchNewContent(locationID);
            })
            .catch(function (error) {
                //fetchNewContent(locationID);
                console.log(error);
            });

        const fetchNewContent = (locationID) => {
            this.fetchUpdatedAnswerArray(locationID)
        }

    }

    handleRemoveAnswer(locationID, contentID) {
        var data = JSON.stringify(
            {
                "location-update": {
                    "location-id": locationID,
                    "content": [{
                        "delete": contentID
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
                fetchNewContent(locationID);
            })
            .catch(function (error) {
                console.log(error);
            });

        const fetchNewContent = (locationID) => {
            this.fetchUpdatedAnswerArray(locationID)
        }
    }

    render() {

        let toReturn;
        let toReturnArray = [];
        if (this.state.content.length !== 0) {

            let j = 1;
            this.state.content.forEach(item => {

                let inputName = "locationAnswer" + j.toString();
                let inputValue = this.props.data[inputName];
                let checkboxName = "locationCorrect" + j.toString();
                let checkboxValue = this.props.data[checkboxName];
                let contentID = item["content-id"];

                toReturn = (
                    <div key={contentID} className="row">
                        <label className='col s8 m9'>
                            Fråga
                            <input className="grey lighten-3"
                                name={inputName}
                                type="text"
                                value={inputValue}
                                onChange={this.onFieldChange.bind(this)} />
                        </label>
                        <label className='col s1' style={{ 'marginTop': '1rem' }}>
                            <input className='text-black'
                                name={checkboxName}
                                checked={checkboxValue}
                                type="checkbox"
                                onChange={this.onFieldChange.bind(this)} />
                            <span>Rätt svar</span>
                        </label>
                        <span className='col s1 right' onClick={() => this.handleRemoveAnswer(this.state.locationID, contentID)} style={{ 'marginTop': '1rem' }}> <i className="material-icons">delete_forever</i></span>
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
                if (this.state.content.length <= 3) {
                    return (
                        <div onClick={() => this.handleAddAnswer(this.state.locationID)}>Lägga till här</div>
                    )
                }
            })()}
        </>
        )
    }
}