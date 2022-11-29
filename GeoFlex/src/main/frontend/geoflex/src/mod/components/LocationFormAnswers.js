import React, { Component } from 'react';
import M from 'materialize-css';

export default class LocationFormAnswers extends Component {
    constructor(props) {
        super(props)
        console.log("CHILD")
        console.log(this.props.data.locationAnswer1)

        //this.handleRenderAnswers = this.handleRenderAnswers.bind(this);
    }
    componentDidMount(){
        
    }

    onFieldChange(event) {
        /**
         * passing on the event to parent class method
         *  */        
        this.props.handleInputChange(event);
    }

    render() {
        return (<>
            {
                (() => {
                    let contentLength = this.props.content.length
                    if (this.props.content.length === 0) {
                        return (
                            <div>someCase</div>
                        )
                    } else if ((this.props.content.length !== 0) && (this.props.content.length <= contentLength)) {
                        let i = 0;
                        let renderThis = null;
                        let andThis = []
                        let addNewAnswer = (<p>Lägg tlill ett svarsalternativ</p>)
                        if (this.props.content.length <= 4){

                        }

                        this.props.content.forEach(element => {

                            i++;
                            let inputName = "locationAnswer" + i.toString();
                            let inputValue = this.props.data[inputName];
                            let checkboxName = "locationCorrect" + i.toString();
                            let getCheckboxValue = this.props.data[checkboxName];
                            let setChecked = "checked";
                            let keyValue = "locationID" + i.toString();
                            if(getCheckboxValue !== false){
                                setChecked = ""
                            }
                            renderThis = (
                                <div key={keyValue}>
                                    <label className='col s10'>
                                        Fråga
                                        <input className="blue lighten-4"
                                            name={inputName}
                                            type="text"
                                            value={inputValue}
                                            onChange={this.onFieldChange.bind(this)} />
                                    </label>
                                    <label className='col s2'>
                                        Rätt svar
                                        <input className='text-black '
                                            name={checkboxName}
                                            type="radio"
                                            
                                            onChange={this.onFieldChange.bind(this)} />
                                    </label>
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
                    } else if(this.props.content.length <= 4) {
                        //försökte få till knappen här men ska nog lägga den i en egen if sats helt enkelt.
                        return (
                            <div>Lägg till ett svarsalternativ</div>
                        )
                    }
                })()
            }

        </>
        )
    }
}


/*
            <label>
                Fråga
                <input
                    className='blue lighten-4'
                    name="lcoationAnswer1" type="text"
                    value="hejsan"
                    onChange={this.onFieldChange.bind(this)} />
            </label>
*/