import React from 'react'
import Button from '../shared/Button'
import QRscanner from '../shared/QR'
import Basicmaps from './Basicmaps'
import TestMap from './TestMap'



export default function GameNavigation() {
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
                      <TestMap />
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div className="row">
      <div className='container'>
        <QRscanner />
      </div> 
    </div>  
    </>
  )
}
