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

      checkRoute = () => {
        const { number1, number2, number3, number4 } = this.state;
        if (number1 && number2 && number3 && number4) {
          const routeCode = `${number1}${number2}${number3}${number4}`;
          axios.get(`http://localhost:3000/user/checkRoute?routeCode=${routeCode}`)
            .then(response => {
              // do something with the response
            })
            .catch(error => {
              // handle error
            });
        }
      }
      
    
      render() {
        return (<>
                     
            <div className='container'>
              <input 
              type="text" 
              name="number1" 
              className="col s2 offset-2 white " 
              ref={(input) => { this.inputs.number1 = input; }} 
              value={this.state.number1} 
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown} 
              onInput={this.checkRoute}/>
            
              <input 
              type="text" 
              name="number2" 
              className="col s2 white " 
              ref={(input) => { this.inputs.number2 = input; }} 
              value={this.state.number2} 
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown}
              onInput={this.checkRoute}/>
            
              <input 
              type="text" 
              name="number3" 
              className="col s2 white " 
              ref={(input) => { this.inputs.number3 = input; }} 
              value={this.state.number3} 
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown}
              onInput={this.checkRoute}/>
            
              <input 
              type="text" 
              name="number4" 
              className="col s2 white " 
              ref={(input) => { this.inputs.number4 = input; }} 
              value={this.state.number4} 
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown}
              onInput={this.checkRoute}/>
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