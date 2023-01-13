import React, { useEffect, useState } from 'react';

export default function GameResults(props) {
/**
 * functional component that handles and renders the game results for the user
 * the useEffect react hook renders when component is loaded and whenever index changes state
 * in order to handle both quizes and information tours (without questions and answers) it renders either the results or nothing
 */

    const [index, setIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [renderUserAnswers, setRenderUserAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [quizType, setQuizType] = useState("");

    const lastIndex = props.answers.length

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

    if (quizType === "quiz") {
        return (
            <div>
                <h5>{currentQuestion.name}</h5>
                <p>{currentQuestion.text_info}</p>
                <h6>Rätt svar</h6>
                {
                    [...correctAnswers].map((answer) => (<p
                        key={answer["content-id"]}
                    > {answer.answer}</p>

                    ))}
                <h6>Ditt svar</h6>
                {
                    [...renderUserAnswers].map((answers) => <p
                        key={answers["content-id"]}> {answers.answer}</p>
                    )
                }<div className='row'>
                <button className="col s6 btn waves-teal btn col btn-large btn-css icon-css z-depth-2"
                    onClick={handlePrev}
                    disabled={index === 0}>
                    Föregående
                </button>
                <button
                    className="btn col s6 waves-teal btn col btn-large btn-css icon-css z-depth-2"
                    onClick={handleNext}
                    disabled={index === lastIndex - 1}>
                    Nästa
                </button>
                </div>
            </div>
        )
    } else {
        return (
            <>

            </>
        )
    }
}
