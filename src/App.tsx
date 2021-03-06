import React, { useEffect, useState } from 'react';

import { Ask, Answer, Stage, Difficulty } from './types';
import './App.css';

import { Header } from './components/header/Header';
import { Board } from './components/board/Board';
import { Footer } from './components/footer/Footer';
import { fetchTrivia } from './api/fetch-trivia';

function App() {
    const [stage, setStage] = useState('start' as Stage);
    const [asks, setAsks] = useState([] as Ask[]);
    const [answers, setAnswers] = useState([] as Answer[]);
    const [score, setScore] = useState(0);
    const [currentAsk, setCurrentAsk] = useState({} as Ask);
    const [currentAskIndex, setCurrentAskIndex] = useState(0);
    const [hasError, setHasError] = useState(false);

    /**
     * side effects
     *
     * per stage,
     * if stage is start,
     * then fetch asks from api
     */
    useEffect(() => {
        if (stage === 'start') {
            fetchData();
        }
    }, [stage]);

    /**
     * side effects
     *
     * per current ask index,
     * if current ask index equals number of questions,
     * then set current ask index to 0 and set stage to end
     * else set current ask index to current ask index
     */
    useEffect(() => {
        if (asks.length > 0) {
            if (currentAskIndex === asks.length) {
                goToNextStage();
                setCurrentAskIndex(0);
            } else {
                setCurrentAsk(asks[currentAskIndex]);
            }
        }
    }, [currentAskIndex, asks]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * go to next stage
     */
    const goToNextStage = () => {
        if (stage === 'start') {
            setStage('during');
            setScore(0);
            setCurrentAsk(asks[currentAskIndex]);
        } else if (stage === 'during') {
            setStage('end');
        } else if (stage === 'end') {
            setStage('start');
            setAnswers([]);
        }
    };

    /**
     * go to next ask
     *
     * @param {Answer} answer
     */
    const onNextAsk = (answer: Answer) => {
        if (currentAsk?.correct_answer === answer) {
            setScore(score + 1);
        }
        setAnswers([...answers, answer]);
        setCurrentAskIndex(currentAskIndex + 1);
    };

    /**
     * restart game
     *
     * @returns {Promise<any>}
     */
    const onRestart = async (): Promise<any> => {
        setStage('start');
        setScore(0);
        setCurrentAskIndex(0);
        setAnswers([]);
        setHasError(false);
        await fetchData();
    };

    /**
     * fetch trivia data from api and set in state
     *
     * @returns {Promise<any>}
     */
    const fetchData = async (): Promise<any> => {
        const difficulty = ['easy', 'medium', 'hard'][
            Math.floor(Math.random() * 3)
        ] as Difficulty;

        try {
            const response = await fetchTrivia(difficulty);
            setAsks(response.results);
        } catch (error) {
            setHasError(true);
        }
    };

    return (
        <div className="App">
            <Header
                stage={stage}
                category={currentAsk?.category}
                score={`${score} / ${asks.length}`}
            />
            <Board
                stage={stage}
                asks={asks}
                hasError={hasError}
                currentAskIndex={currentAskIndex}
                answers={answers}
            />
            <Footer
                stage={stage}
                hasError={hasError}
                onClick={(data?: Answer) => {
                    !hasError
                        ? stage === 'during'
                            ? onNextAsk(data as Answer)
                            : goToNextStage()
                        : onRestart();
                }}
            />
        </div>
    );
}

export default App;
