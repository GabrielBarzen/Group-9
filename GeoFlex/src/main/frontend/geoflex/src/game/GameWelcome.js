import React from 'react';
import Button from '../shared/Button';

export default function GameWelcome(props) {

  const handleGameStart = () =>{
    props.setGameStart(true)
  }



    
    
  


  return (
    <>
    <div className='row'>
        <div className='container white container-css'>
            <div className='row center-align'>
                <div className="col s12">
                  <div className='row'>
                    <div className='col s12'>
                      <h2 className='center align'>Välkommen</h2>
                      <p>
                        {props.welcomeData.title}
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12'>
                      <p>
                          Eventuell bild här
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12'>
                      <p>
                        {props.welcomeData.description}
                      </p>
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div className="row">
      <div className='container'>
        <Button text="Kör igång" css="col s12" click={handleGameStart} icon={<i className="small material-icons right">arrow_forward</i>}/>
      </div> 
    </div>  
    </>
  )
}
