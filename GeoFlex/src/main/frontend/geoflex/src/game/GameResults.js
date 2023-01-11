import React, { useEffect, useState } from 'react';
import Button from '../shared/Button';

export default function GameResults(props) {

    const [index, setIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [renderUserAnswers, setRenderUserAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [quizType, setQuizType] = useState("")

    const lastIndex = props.answers.length
    /*
        const object = {
      "questionID": "116499",
      "answers": {
        "141": true,
        "142": true
      }
    };
    
    const answerArray = Object.keys(object.answers);
    console.log(answerArray); 
    
          */
    // 0 = zero
    // 1 = one

    useEffect(() => {

        //collects and sets current answer and question
        const currentAnswer = props.answers[index]
        const currentQuestion = props.questions[index]
        if (props.questions.length !== 0) {
            setCurrentAnswer(currentAnswer)
            setCurrentQuestion(currentQuestion)

            //Filter the correct answers for the quiz
            let questionsAnswers = currentQuestion.content;
            const filterCorrect = questionsAnswers.filter(answer => answer.correct === true)
            setCorrectAnswers(filterCorrect)

            //get user answers
            const userAnswerArray = Object.keys(currentAnswer.answers)
            //create user answer object(s)
            let filterUserAnswer = [];
            userAnswerArray.forEach((element) => {
                questionsAnswers.forEach((item) => {
                    if (element === item["content-id"]) {
                        filterUserAnswer.push(item)
                    }
                }
                )
            });
            setRenderUserAnswers(filterUserAnswer);
            setQuizType("quiz")
        } else {
            setQuizType("info")
        }


    }, [index, setCorrectAnswers, setCurrentAnswer, setCurrentQuestion, setRenderUserAnswers])



    const handleNext = () => {
        setIndex(prevIndex => prevIndex + 1);
    }
    const handlePrev = () => {
        setIndex(prevIndex => prevIndex - 1);
    }

    if(quizType === "quiz"){
    return (
        <div>
            <h2>{currentQuestion.name}</h2>
            <p>{currentQuestion.text_info}</p>
            <h3>Rätt svar</h3>
            {
                [...correctAnswers].map((answer) => (<p
                    key={answer["content-id"]}
                > {answer.answer}</p>

                ))}
            <h3>Ditt svar</h3>
            {
                [...renderUserAnswers].map((answers) => <p
                    key={answers["content-id"]}> {answers.answer}</p>
                )
            }
           
            <Button click={handlePrev} text={"Föregående"}/>
            <Button click={handleNext} text={"Nästa"}/>
        </div>
    )} else {
        return(
            <>
            
            </>
        )
    }
}
