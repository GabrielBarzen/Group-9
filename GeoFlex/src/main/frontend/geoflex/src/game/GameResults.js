import React, { useState } from 'react';

export default function GameResults(props) {

    const [index, setIndex] = useState(0);

    const currentQuestion = props.questions[index]
    const currentAnswer = props.answers[index]
    const lastIndex = answers.length


    const handleNext = () => {        
        setIndex(prevIndex => prevIndex + 1);
    }
    const handlePrev = () => {        
        setIndex(prevIndex => prevIndex - 1);
    }


  return (
    <div>
        <p>RESULTS</p>
        <p>{currentQuestion}</p>
        <p>{currentAnswer}</p>
        <p>{lastIndex}</p>
    </div>
  )
}
