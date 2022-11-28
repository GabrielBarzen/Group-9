import React from 'react'
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
                    <div className='col s12'>
                      <p>Hur fula är dessa stenar?</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12 black'>
                      <p>
                        Fråga 1
                      </p>
                    </div>
                    <div className='col s12 red'>
                      <p>
                          Fråga 2
                      </p>
                    </div>
                    <div className='col s12 yellow'>
                      <p>
                          Fråga 3
                      </p>
                    </div>
                    <div className='col s12 orange'>
                      <p>
                          Fråga 4
                      </p>
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
