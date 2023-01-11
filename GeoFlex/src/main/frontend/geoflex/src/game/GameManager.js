import React, { useState } from 'react';
import Button from '../shared/Button';
import GameItem from './GameItem';
import GameIndoorNavigation from './GameIndoorNavigation';
import GameOutdoorNavigation from './GameOutdoorNavigation';
import GameFinish from './GameFinish';

export default function GameManager(props) {
    /**
     * this component handles the main part of the quiz game logic, like what is rendered and when it is rendered
     * using index to to only render one question at a time by using that as the current state makes sure we got all the relevant data for the current question
     * different meta-data in the currentQuestion object will help the GameManager know if QRCode is being used or if it should look for the coordinates instead.
     * userArrived (true/false) will be set false as default value and act as a gatekeeper to when either the correct QRCode is scanned or the user has arrived at the correct coordinates
     */
    const [index, setIndex] = useState(0);
    const [clickedIds, setClickedIds] = useState({});
    const [userArrived, setUserArrived] = useState(false);


    const currentQuestion = props.questions[index];

    const handleNext = () => {
        // Check if the current question has been answered
        setIndex(prevIndex => prevIndex + 1);
    }

    const handleSave = async () => {
        /**
         * this function saves the users answers to localStorage under the key 'userAnswers' after checking that the 'clickedIds is not empty 
         * Please note that this function does NOT overwrite the key in localStorage but adds to the array.
         * Also note that this is an async function that waits until the item is saved to localStorage before it clears the 'clickedIds' and calls 'handleNext()'
         * */
        if (Object.keys(clickedIds).length === 0) {
            console.log("clickedIds is empty, skipping handleSave")
            return;
        }

        let userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

        userAnswers = userAnswers || [];

        const newAnswer = {
            questionID: currentQuestion.location_id,
            answers: clickedIds
        };

        userAnswers.push(newAnswer);

        await localStorage.setItem(
            'userAnswers',
            JSON.stringify(userAnswers)
        );

        setClickedIds({});
        setUserArrived(false);
        handleNext();
    };
    function handleUserArrivedStatus(result) {
        if (result === true) {
            console.log("GAMEMANAGER")
            setUserArrived(true)
            console.log(userArrived)
        }
    }
    if (currentQuestion.last_location !== "true") {
        if (currentQuestion.qr === "true") {
            return (
                <div>
                    {index === props.questions.length - 1 ? (
                        <div>
                            {userArrived ? <GameItem currentQuestion={currentQuestion} /> : <GameIndoorNavigation />}
                        </div>
                    ) : (
                        <div>
                            {userArrived ? <GameItem currentQuestion={currentQuestion} clickedIds={clickedIds} setClickedIds={setClickedIds} /> : <GameIndoorNavigation currentQuestion={currentQuestion} setUserArrived={handleUserArrivedStatus} />}
                            {userArrived && (
                                <div className='row'>
                                    <div className='container'>
                                        <Button text="Nästa fråga" css="col s12" click={handleSave} icon={<i className="small material-icons right">arrow_forward</i>} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        } else if (currentQuestion.qr === "false") {
            console.log("KOLLA HÄR")
            console.log(currentQuestion.x_coords)
            console.log(currentQuestion.y_coords)

            const destination = []
            let longitude = parseFloat(currentQuestion.x_coords);
            let latitude = parseFloat(currentQuestion.y_coords);
            destination.push(latitude);
            destination.push(longitude);

            console.log(destination[0])
            console.log(destination[1])


            return (
                <div>
                    {index === props.questions.length - 1 ? (
                        <div>
                            {userArrived ? <GameItem currentQuestion={currentQuestion} /> : <GameOutdoorNavigation />}
                        </div>
                    ) : (
                        <div>
                            {userArrived ? <GameItem currentQuestion={currentQuestion} clickedIds={clickedIds} setClickedIds={setClickedIds} /> : <GameOutdoorNavigation currentQuestion={currentQuestion} destination={destination} setUserArrived={setUserArrived} />}
                            {userArrived && (
                                <div className='row'>
                                    <div className='container'>
                                        <Button text="Nästa fråga" css="col s12" click={handleSave} icon={<i className="small material-icons right">arrow_forward</i>} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    } else {
        return(
            <>
            <GameFinish currentQuestion={currentQuestion}/>
            </>
        )
    }

}
/*
        <div>
            {index === props.questions.length - 1 ? (

                <div>
                    <GameItem
                        currentQuestion={currentQuestion}
                    />
                    
      </div>
                </div>
            ) : (
                <div>
                    <GameItem
                        currentQuestion={currentQuestion}
                        saveDataToLocalStorage={saveDataToLocalStorage}
                        handleNext={handleNext}
                    />
                </div>
                <div className='row'>
        <div className='container'>
          <Button text="Nästa fråga" css="col s12" click={handleSave} icon={<i className="small material-icons right">arrow_forward</i>} />
        </div>
            )}
        </div>




        <div>
            {index === props.questions.length - 1 ? (
                
                <div>
                    <h1>{currentQuestion.name}</h1>
                    <p>{currentQuestion.text_info}</p>

                    {currentQuestion.media.map(media => (
                        <div key={media.mediaURL}>
                            {media.mediaType === 'video' && (
                                <video src={media.mediaURL} />
                            )}
                            {media.mediaType === 'image' && (
                                <img src={media.mediaURL} />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h1>{currentQuestion.name}</h1>
                    <p>{currentQuestion.text_info}</p>

                    {currentQuestion.media.map(media => (
                        <div key={media.mediaURL}>
                            {media.mediaType === 'video' && (
                                <video src={media.mediaURL} />
                            )}
                            {media.mediaType === 'image' && (
                                <img src={media.mediaURL} />
                            )}
                        </div>
                    ))}

                    {index < props.questions.length - 1 && (
                        <button onClick={handleNext}>Next</button>
                    )}
                </div>
            )}
        </div>

*/