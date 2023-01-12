import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameManager from './GameManager';
import GameWelcome from './GameWelcome';
import { useLocation } from 'react-router';

export default function GameLoader() {
    const [data, setData] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [gameStart, setGameStart] = useState(false)
    const [status, setStatus] = useState(false);

    //location recieves data from Link
    const location = useLocation();
    const routeCode = location.state.routeCode;
    const routeID = location.state.id;


    useEffect(() => {
        /**
         * GET API-call to fetch an entire quiz
         * response function is async in order to for each step to finish:
         * clears anything in localStorage
         * saves quizdata into localStorage
         * collect quiz general data 
         * set all locations as state to questions
         * once everything is loaded change status state to "true"
         */
        var config = {
            method: 'get',
            url: '/user/route?routeCode='+routeCode,
            headers: {}
        };

        axios(config)
            .then(async response => {
                console.log(JSON.stringify(response.data));
                await localStorage.clear();
                await localStorage.setItem('quizData', JSON.stringify(response.data[0]));
                await setData({
                    title: response.data[0].title,
                    description: response.data[0].description,
                    type: response.data[0].type,
                    id: response.data[0].id,
                    code: response.data[0].code,
                    routeMedia: response.data[0].routeMedia[0]
                })
                await setQuestions(response.data[0].location)
                await setStatus(true);
            })
            .catch(error => {
                console.log(error);
            });

    }, [])

//conditional rendering to welcome the urser or starting the game through gameManager
    if (status === false) {
        return <p>Loading data...</p>;
    } else if ((status === true) && (gameStart === false)) {
        return (
            <>
                <GameWelcome
                    welcomeData={data}
                    setGameStart={setGameStart}
                />
            </>
        );
    } else if ((status === true) && (gameStart === true)) {
        return (
            <>
                <GameManager
                    control={data}
                    questions={questions}
                />
            </>
        )
    }
}
