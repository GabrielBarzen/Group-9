import React, { Component } from 'react'

export default class Codebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: '',
      number2: '',
      number3: '',
      number4: ''
    };
    this.inputs = {};
  }

  handleChange = event => {
    const { name, value } = event.target;
    if (/^\d$/.test(value)) {
      this.setState({ [name]: value });
      const nextInputField = this.inputs[name].nextSibling;
      if (nextInputField) {
        nextInputField.focus();
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


  render() {
    return (<>
      <div className='row'>
        <div className='col'>
          <b>Skriv in din fyrsiffriga kod eller scanna QR-kod för att gå med i rundan.</b>
        </div>
      </div>

      <div className='row'>
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
          className="col s1 white offset-s2"
          ref={(input) => { this.inputs.number4 = input; }}
          value={this.state.number4}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
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