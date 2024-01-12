import React, { useState } from 'react';
import './Question.css'

const Question = ({ data, onAnswerSelected }) => {

    const { mep_id, mep_name, correctAnswer, options } = data;
    const [showHint, setShowHint] = useState(false);
    const [answered, setAnswered] = useState(false);
    const baseUrl = 'https://www.europarl.europa.eu/mepphoto/'; // Base URL
    const imageUrl = `${baseUrl}${mep_id}.jpg`; // Interpolated URL
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    return (
        <div className="question-container">
            <img src={imageUrl} height={400} width={340} />
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="option-button"
                        style={{ backgroundColor: answered ? (option == correctAnswer ? '#00dd44' : '#ff0040') : '#007bff' }}
                        onClick={() => {
                            setAnswered(true);setShowHint(false);
                            setTimeout(() => {
                                onAnswerSelected(option);
                                setAnswered(false);
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
