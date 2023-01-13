import React, { Component } from 'react';
import axios from 'axios';

export default class Codebox extends Component {
  /**
   * class component to handle the codebox that starts a specific quiz
   * constructor sets states and bind methods that need binding
   */

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
    /**
     * react method that runs before render
     */
    const inputs = document.getElementById("inputs");
    inputs.firstElementChild.focus();
  }

  handleChange = async event => {
    /**
     * method to handle the codebox input fields
     * restricts input field to only take numbers and only 1 in each
     * once one input field is filled focus shift the next sibling element !NOTE next sibling element meean functionality will break if the HTML DOM tree changes and the inputfields arent direct siblings
     */
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const numbers = this.inputNumbers;

    if (/^\d$/.test(value)) {

      this.setState({ [name]: value });
      numbers.push(value);
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
    /**
     * method the check if backspace or delete key is used in order to clear a faulty enter of an inputfield
     */
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
    /**
     * if 4 numbers are entered in the codebox API call to check if the number is valid
     * if valid a number is entered user will be redirected to the quiz
     * else the codebox will be cleared and message set to notify the user that the code was wrong
     */
    let routeCode;
    if (numbers.length === 4) {
      routeCode = numbers.join('');
      const url = "/user/checkRoute?routeCode=" + routeCode
      axios.get(url)
        .then(response => {
          if (response.data != "-1") {
            let url = "/game/" + response.data + "/welcome"
            this.props.handleNavigate(url, routeCode, response.data);

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
            const inputs = document.getElementById("inputs");
            inputs.firstElementChild.focus();
          }
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      this.setState({ status: "Fel kod, försök igen." })
      this.inputNumbers = []
      this.setState({
        number1: '',
        number2: '',
        number3: '',
        number4: ''
      })
      const inputs = document.getElementById("inputs");
      inputs.firstElementChild.focus();
    }
  }

  render() {
    return (<>
      <div className='row'>
        <div className='col center-align'>
          <b>Skriv in din fyrsiffriga kod för att starta rundan.</b>
        </div>
      </div>      
      <div id="inputs" className='row'>
        <input
          type="text"
          name="number1"
          className="col s1 white offset-s1"
          ref={(input) => { this.inputs.number1 = input; }}
          value={this.state.number1}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />

        <input
          type="text"
          name="number2"
          className="col s1 white offset-s2"
          ref={(input) => { this.inputs.number2 = input; }}
          value={this.state.number2}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />

        <input
          type="text"
          name="number3"
          className="col s1 white offset-s2"
          ref={(input) => { this.inputs.number3 = input; }}
          value={this.state.number3}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />

        <input
          type="text"
          name="number4"
          className="col s1 offset-s2"
          ref={(input) => { this.inputs.number4 = input; }}
          value={this.state.number4}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
      </div>
      <div className='row center-align red-text'>
        {this.state.status}
      </div>
    </>
    );
  }
}