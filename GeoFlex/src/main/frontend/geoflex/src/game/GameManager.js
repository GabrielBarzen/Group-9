import React, { Component } from 'react';
import GameWelcome from './GameWelcome';

export default class GameManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizData: this.props.data,
            quizID: "",
            welcome: true,
            finished: false,
            currentQuestion: {
                questionID: "",
                longitude: "",
                latitude: "",
                title: "",
                question: "",

                answer1: {
                    id: "",
                    content: "",
                    correct: ""
                },
                answer2: {
                    id: "",
                    content: "",
                    correct: ""
                },
                answer3: {
                    id: "",
                    content: "",
                    correct: ""
                },
                answer4: {
                    id: "",
                    content: "",
                    correct: ""
                },
                answer5: {
                    id: "",
                    content: "",
                    correct: ""
                }
            },

        }

        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.getLocations = this.getLocations.bind(this);
    }

    async saveToLocalStorage(dataKey, data) {

        try {

            if (localStorage.length === 0) {

                await localStorage.setItem(dataKey, JSON.stringify(data));
            } else {

                let savedObject = JSON.parse(await localStorage.getItem(dataKey));


                if (savedObject.id !== data.id) {

                    await localStorage.clear();

                    await localStorage.setItem(dataKey, JSON.stringify(data));
                }
            }
        } catch (error) {

            console.error(error);
        }
    }

    fetchFromLocalStorage(dataKey) {
        try {

            let savedObject = JSON.parse(localStorage.getItem(dataKey));

            return savedObject;
        } catch (error) {

            console.error(error);

            return null;
        }
    }

    render() {
        let output;
        if (this.state.welcome === true) {
            output = <><GameWelcome /></>
        }


        return (<>
        {output}
        </>)
    }
}
