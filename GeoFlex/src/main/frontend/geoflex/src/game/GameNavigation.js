import React from 'react'
import Button from '../shared/Button'
export default function GameNavigation(props) {

  function handleClick(){
    props.setQRScanner(true)
  }

  return (
    <>
    <div className='row'>
        <div className='container white container-css'>
            <div className='row center-align'>
                <div className="col s12">
                  <div className='row'>
                    <div className='col s12'>
                      <h2 className='center align'>Navigation</h2>
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
                        Navigationstips! För att hitta till frågan ....
                      </p>
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div className="row">
      <div className='container'>
      <Button text="Scanna QR" css="col s12" click={handleClick} icon={<i className="small material-icons right">qr_code_scanner</i>}/>
      </div> 
    </div>  
    </>
  )
}
