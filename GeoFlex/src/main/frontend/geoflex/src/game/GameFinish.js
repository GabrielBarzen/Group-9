import React, { useEffect, useState } from 'react';
import GameResults from './GameResults';

export default function GameFinish(props) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const data = props.currentQuestion;
  

    useEffect(() => {
        const loadQuizData = JSON.parse(localStorage.getItem("quizData"));
        const quizData = loadQuizData.location;
        console.log("QUIZDATA")
        console.log(quizData)

        const loadAnswers = JSON.parse(localStorage.getItem("userAnswers")) || "";
        console.log("ANSWERS")
        console.log(loadAnswers)
      setQuestions(quizData);
      setAnswers(loadAnswers);         
    }, [setQuestions, setAnswers])
  if((questions.length !== 0) && (answers.length) !== 0){
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
                  <GameResults questions={questions} answers={answers}/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )  }
  else {
    return(<>
    <p>Laddar svar...</p>
    </>)
  }
}
