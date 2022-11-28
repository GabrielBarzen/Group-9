import React, { Component } from 'react'

export default class LocationFormAnswers extends Component {
    constructor(props) {
        super(props)
        console.log("CHILD")
        console.log(this.props.data.locationAnswer1)

        //this.handleRenderAnswers = this.handleRenderAnswers.bind(this);
    }

    onFieldChange(event) {

        // for a regular input field, read field name and value from the event
        console.log("ON FIELD CHANGE i LocationFormAnswers.js")
        console.log(this.props.data.locationAnswer1)
        //const fieldName = event.target.name;
        //const fieldValue = event.target.value;
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
                        this.props.content.forEach(element => {                                                    
                            
                            i++;
                            let inputName = "locationAnswer" + i.toString();
                            let inputValue = this.props.data[inputName];
                            renderThis = (<label>Fråga<input className="blue lighten-4" name={inputName} type="text" value={inputValue} onChange={this.onFieldChange.bind(this)} /></label>)
                            andThis.push(renderThis);

                        });
                        return (<>
                            {[...andThis].map((html) => (
                                html
                            ))}
                        </>
                        )
                    } else {
                        return (
                            <div>catch all</div>
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