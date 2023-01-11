import React from 'react';
import GameResults from './GameResults';

export default function GameFinish(props) {

  const data = props.currentQuestion;

  return (
    <>
      <div className='row'>
        <div className='container white container-css'>
          <div className='row center-align'>
            <div className="col s12">
              <div className='row'>
                {/* Add a conditional statement to render the appropriate element based on the values of data.media[0].externalMedia and data.media[0].mediaType */}
                {data.media[0].externalMedia && data.media[0].mediaType === "video" ? (
                  // Render an iframe element
                  <iframe src={data.media[0].mediaURL} title="youtube video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : data.media[0].mediaType === "video" ? (
                  // Render a video element
                  <video src={data.media[0].mediaURL} controls></video>
                ) : (
                  // Render an img element
                  <img src={data.media[0].mediaURL} alt="questionImage" className='responsive-img' style={{ "borderRadius": "5px" }}></img>
                )}
              </div>

              <div className='row'>
                <div className='col s12 grey lighten-3' style={{ "borderRadius": "5px", "padding": '2rem' }}>
                  <div className='row'>
                    <h5>{data.name}</h5>
                    <p>{data.text_info}</p>
                  </div>
                </div>
              </div>              
            </div>
            <div className='row'>
              <div className='col s12'>
                <p>
                  <GameResults />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
