import React, { useState } from 'react';

export default function GameManager(props) {
    const [index, setIndex] = useState(0);

    const currentQuestion = props.questions[index];

    const handleNext = () => {
        // Check if the current question has been answered

        setIndex(prevIndex => prevIndex + 1);

    }
    const saveDataToLocalStorage = (dataKey, data) => {

        localStorage.setItem(dataKey, data);
    }

    return (
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
    );
}