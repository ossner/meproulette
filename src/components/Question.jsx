import React, { useState } from 'react';

const Question = ({ data, onAnswerSelected }) => {

    const { mep_id, mep_name, correctAnswer, options } = data;
    const [showHint, setShowHint] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const baseUrl = 'https://www.europarl.europa.eu/mepphoto/'; // Base URL
    const imageUrl = `${baseUrl}${mep_id}.jpg`; // Interpolated URL

    return (
        <div className="quiz-container">
            <img src={imageUrl} className='question-image' alt='' />
            <div className='options-container'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="option-button"
                        disabled={disabled}
                        style={{ backgroundColor: answered ? (option === correctAnswer ? '#467A39' : '#DA2131') : '#004494' }}
                        onClick={() => {
                            setAnswered(true);
                            setShowHint(false);
                            setDisabled(true);
                            setShowHint(true);
                            setTimeout(() => {
                                onAnswerSelected(option);
                                setAnswered(false);
                                setDisabled(false);
                                setShowHint(false);
                            }, 1000);
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {showHint ? <p>{mep_name}</p> : <button className='option-button' onClick={() => { setShowHint(true) }}>Show Hint</button>}
        </div>
    );
};

export default Question;
