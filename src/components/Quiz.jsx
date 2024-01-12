import React, { useState, useEffect } from 'react';
import Question from './Question';
import MEPList from '../data/MEPList.json'
import './Quiz.css'

const Quiz = () => {
    const [question, setQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [tries, setTries] = useState(0);

    useEffect(() => {
        setQuestion(constructQuestion(MEPList))
    }, []);

    const constructQuestion = (mepsData) => {
        const mep = mepsData['meps'][Math.floor(Math.random() * mepsData['meps'].length)]
        return { mep_id: mep.id, mep_name: mep.fullName, correctAnswer: mep.country, options: generateOptions(mep.country, mepsData) }
    }

    const generateOptions = (correctOption, mepsData) => {
        // Generate three random options plus the correct one
        // Ensure no duplicates and correct answer is included
        let options = new Set();
        options.add(correctOption);
        while (options.size < 4) {
            const randomOption = mepsData['meps'][Math.floor(Math.random() * mepsData['meps'].length)].country;
            options.add(randomOption);
        }
        return shuffle([...options]);
    };

    const handleAnswer = (selectedAnswer) => {
        if (selectedAnswer === question.correctAnswer) {
            setScore(score + 1)
        }
        setQuestion(constructQuestion(MEPList))
        setTimeout(() => {;
        }, 1000); // 1000 milliseconds = 1 second
        setTries(tries + 1)
    };

    return (
        <div className='quiz-container'>
            <center>
                <h2>score:{score}/{tries}</h2>

            </center>
            {question == null ? (
                <div>Loading...</div>
            ) : (
                <Question
                    data={question}
                    onAnswerSelected={handleAnswer}
                />
            )}
        </div>
    );
};

export default Quiz;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}