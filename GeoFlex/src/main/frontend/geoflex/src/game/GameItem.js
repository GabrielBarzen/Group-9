import React from 'react'
import Button from '../shared/Button'
import Picture from './QuestionPic.jpg'
export default function GameItem() {
  return (
    <>
    <div className='row'>
        <div className='container white container-css'>
            <div className='row center-align'>
                <div className="col s12">
                  <div className='row'>
                    <img src={Picture} alt="questionImage" className='responsive-img' style={{"border-radius": "5px"}}></img>
                  </div>
                  <div className='row'>
                    <div className='col s12 grey lighten-3' style={{"border-radius": "5px", "padding": '2rem'}}>
                      <p>Hur fula är dessa stenar?</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12 light-blue darken-3 white-text' style={{"border-radius": "5px", "padding": "0.75rem", "marginBottom": "1rem"}}>
                      <p>
                      <i className="small material-icons left" style={{"margin-right": "0px"}}>panorama_fish_eye</i>
                        Svar 1
                      </p>
                    </div>
                    <div className='col s12 grey darken-3 white-text' style={{"border-radius": "5px", "padding": "0.75rem", "marginBottom": "1rem"}}>
                      <p>
                      <i className="small material-icons left" style={{"margin-right": "0px"}}>crop_square</i>
                      Svar 2 
                      </p>
                    </div>
                    <div className='col s12 amber darken-4 white-text' style={{"border-radius": "5px", "padding": "0.75rem", "marginBottom": "1rem"}}>
                      <p>
                      <i className="small material-icons left" style={{"margin-right": "0px"}}>change_history</i>
                      Svar 3
                      </p>
                    </div>
                    <div className='col s12 purple darken-4 white-text' style={{"border-radius": "5px", "padding": "0.75rem"}}>
                      <p>
                      <i className="small material-icons left" style={{"margin-right": "0px"}}>star_border</i>
                      Svar 4
                      </p>
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div className='row'>
      <div className='container'>
        <Button text="Nästa fråga" css="col s12" icon={<i className="small material-icons right">arrow_forward</i>}/>
      </div>
    </div>
    </>
  )
}
