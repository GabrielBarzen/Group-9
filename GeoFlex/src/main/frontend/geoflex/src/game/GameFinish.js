import React, { useEffect, useState } from 'react';
import GameResults from './GameResults';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function GameFinish(props) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const data = props.currentQuestion;

  useEffect(() => {

    //API-call to update database that a user has finished a quiz
    var config = {
      method: "get",
      url: "/user/route/stats/finished?routeId=" + props.quizID,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error.response.data);
      });

    //loads data to be used for GameResults
    const loadQuizData = JSON.parse(localStorage.getItem("quizData"));
    const quizData = loadQuizData.location;
    const loadAnswers = JSON.parse(localStorage.getItem("userAnswers")) || "";
    setQuestions(quizData);
    setAnswers(loadAnswers);

  }, [setQuestions, setAnswers])

  function checkCookie() {
    /**
     * reads and returns cookie value
     */
    const cookies = new Cookies();
    let cookieValue = cookies.get('user-id')
    return cookieValue
  }

  function assignRouteToUser(id) {
    /**
     * PATCH API-call to assign a finished route to user
     */
    var data = JSON.stringify(
      {
        "user-id": id,
        "access-level": 0,
        "route": [
          {
            "assign": props.quizID
          }
        ]
      }
    )

    var config = {
      method: 'patch',
      url: '/user/route/assign',
      headers: {
        'Content-Type': 'text/plain',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //verify if current user isLoggeIin
  let hasCookie = checkCookie();
  console.log(hasCookie)
  if (hasCookie !== undefined) {
    assignRouteToUser(hasCookie)
  }

  if ((questions.length !== 0) && (answers.length) !== 0) {
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
                    <GameResults questions={questions} answers={answers} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (<>
      <p>Laddar svar...</p>
    </>)
  }
}
