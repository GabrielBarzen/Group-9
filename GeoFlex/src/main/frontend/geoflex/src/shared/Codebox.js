import React, { Component } from 'react';
import axios from 'axios';

export default class Codebox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number1: '',
            number2: '',
            number3: '',
            number4: '',
            status: ""

        };
        this.inputNumbers = []
        this.inputs = {};
        this.checkRoute = this.checkRoute.bind(this);
    }

    componentDidMount() {
        const inputs = document.getElementById("inputs");
        inputs.firstElementChild.focus();
    }

    handleChange = async event => {
        console.log(event.target.value)
        //const { name, value } = event.target;
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const numbers = this.inputNumbers;

        if (/^\d$/.test(value)) {

            this.setState({ [name]: value });
            numbers.push(value);
            console.log("HÄR")
            console.log(numbers)
            const nextInputField = this.inputs[name].nextSibling;
            if (nextInputField) {
                nextInputField.focus();
            } else {

                this.checkRoute(numbers);
            }
        } else {
            this.setState({ [name]: value.slice(0, 1) });
        }
    }

    handleKeyDown = event => {
        if ((event.key === 'Backspace' || event.key === 'Delete') && event.target.value === '') {
            event.preventDefault();
            const { name } = event.target;
            const prevInputField = this.inputs[name].previousSibling;
            if (prevInputField) {
                this.setState({ [name]: '' });
                prevInputField.focus();
            }
        }
    }

    checkRoute(numbers) {
        console.log("CHECKROUTE")
        let routeCode;
        console.log(numbers.length)
        if (numbers.length === 4) {
            routeCode = numbers.join('');
            const url = "/user/checkRoute?routeCode=" + routeCode
            axios.get(url)
                .then(response => {
                    if (response.data != "-1") {
                        let url = "/game/" + response.data + "/welcome"
                        this.props.handleNavigate(url, routeCode, response.data );
                        
                        this.setState({ status: "Laddar quiz" })
                    } else {
                        this.setState({ status: "Fel kod, försök igen." })
                        this.inputNumbers = []
                        this.setState({
                            number1: '',
                            number2: '',
                            number3: '',
                            number4: ''
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    /*
                    let url = "/game/1234/welcome"
                        this.props.handleNavigate(url, "3956", "2039" );
                    */
                });
        }
    }

    render() {
        return (<>

            <div id="inputs" className='container'>
                <input
                    type="text"
                    name="number1"
                    className="col s2 offset-2 white "
                    ref={(input) => { this.inputs.number1 = input; }}
                    value={this.state.number1}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />

                <input
                    type="text"
                    name="number2"
                    className="col s2 white "
                    ref={(input) => { this.inputs.number2 = input; }}
                    value={this.state.number2}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />

                <input
                    type="text"
                    name="number3"
                    className="col s2 white "
                    ref={(input) => { this.inputs.number3 = input; }}
                    value={this.state.number3}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />

                <input
                    type="text"
                    name="number4"
                    className="col s2 white "
                    ref={(input) => { this.inputs.number4 = input; }}
                    value={this.state.number4}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        </>
        );
    }
}




/*
export default function Codebox() {
    return (
        <div className="row valign-wrapper">
            <div className="col s3 codebox"><p className="center-align">4</p></div>
            <div className="col s3 codebox"><p className="center-align">5</p></div>
            <div className="col s3 codebox"><p className="center-align">3</p></div>
            <div className="col s3 codebox"><p className="center-align">1</p></div>
        </div>
    )
} */