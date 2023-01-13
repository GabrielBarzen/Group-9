import React from 'react';
import Button from '../shared/Button';

export default function GameWelcome(props) {
  /**
   * functional component that renders the welcome screen of a quiz
   * method setGameStart from parent component to start the game when set to "true"
   */

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
                {/* Add a conditional statement to render the appropriate element based on the values of props.welcomeData.routeMedia.externalMedia and props.welcomeData.routeMedia.mediaType */}
                {props.welcomeData.routeMedia.externalMedia && props.welcomeData.routeMedia.mediaType === "video" ? (
                  // Render an iframe element
                  <iframe src={props.welcomeData.routeMedia.mediaURL} title="youtube video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : props.welcomeData.routeMedia.mediaType === "video" ? (
                  // Render a video element
                  <video src={props.welcomeData.routeMedia.mediaURL} controls></video>
                ) : (
                  // Render an img element
                  <img src={props.welcomeData.routeMedia.mediaURL} alt="questionImage" className='responsive-img' style={{ "borderRadius": "5px" }}></img>
                )}
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
