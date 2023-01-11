import React, { useState, useEffect } from 'react';

export default function GameResults() {

    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const currentQuestion = questions[index]
    const currentAnswer = answers[index]
    const lastIndex = answers.length

    useEffect(() => {
        const loadQuizData = localStorage.getItem("quizData");
        const quizData = loadQuizData[0].location;
        console.log("QUIZDATA")
        console.log(quizData)
        const loadAnswers = localStorage.getItem("userAnswers");
        console.log("ANSWERS")
        console.log(loadAnswers)
      setQuestions(quizData);
      setAnswers(loadAnswers);             
    }, [setQuestions, setAnswers])

    const handleNext = () => {        
        setIndex(prevIndex => prevIndex + 1);
    }
    const handlePrev = () => {        
        setIndex(prevIndex => prevIndex - 1);
    }


  return (
    <div>GameResults</div>
  )
}
