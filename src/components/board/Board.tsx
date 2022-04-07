import parse from 'html-react-parser';
import { Stage, Ask } from '../../types';
import './Board.css';

type Props = {
    stage: Stage;
    asks: Ask[];
    hasError: boolean;
    currentAskIndex?: number;
    answers?: string[];
};

export const Board = (props: Props) => {
    const {
        stage = 'start',
        asks = [],
        hasError,
        currentAskIndex,
        answers,
    } = props;
    return (
        <main className="board">
            {!hasError ? (
                stage === 'start' ? (
                    <BeginBoard asksCount={asks.length} />
                ) : stage === 'during' ? (
                    <DuringBoard
                        asks={asks}
                        currentAskIndex={currentAskIndex}
                    />
                ) : (
                    <EndBoard asks={asks} answers={answers} />
                )
            ) : (
                <ErrorBoard />
            )}
        </main>
    );
};

const ErrorBoard = () => (
    <span
        style={{ color: 'darkred' }}
        className="board__text board__text-align-center"
    >
        Something went wrong. Please restart game.
    </span>
);
const BeginBoard = ({ asksCount }: { asksCount: number }) =>
    asksCount === 0 ? (
        <span className="board__text board__text-align-center">Loading...</span>
    ) : (
        <>
            <span className="board__text board__text-align-center">
                You will be presented with {asksCount} True or False questions.
            </span>
            <span className="board__text board__text-align-center">
                Can you score 100%?
            </span>
        </>
    );
const DuringBoard = (props: Pick<Props, 'asks' | 'currentAskIndex'>) => {
    const { asks, currentAskIndex = 0 } = props;

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '300px',
                    height: '300px',
                    border: '1px solid black',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <span className="board__text board__text-align-center">
                    {parse(asks[currentAskIndex]?.question ?? '')}
                </span>
            </div>
            <span>
                {currentAskIndex + 1} of {props.asks.length}
            </span>
        </>
    );
};
const EndBoard = (props: Pick<Props, 'asks' | 'answers'>) => {
    const { asks, answers = [] } = props;

    return (
        <ul
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                rowGap: '20px',
                listStyle: 'none',
                paddingInlineStart: '0px',
                width: '80%',
                height: 'inherit',
            }}
        >
            {asks.map((ask, index) => {
                const correctAnswer = ask.correct_answer;
                const isCorrect = ask.correct_answer === answers[index];

                return (
                    <li key={index}>
                        <details>
                            <summary
                                style={{
                                    color: isCorrect ? '#3c3c3c' : 'darkred',
                                    cursor: 'pointer',
                                }}
                            >
                                {parse(ask.question)}
                            </summary>
                            <p className="board__text-small">
                                Answered{' '}
                                {(!isCorrect ? 'in' : '').concat('correctly!')}
                            </p>
                            {!isCorrect && (
                                <p className="board__text-small">
                                    Correct answer is {correctAnswer}
                                </p>
                            )}
                        </details>
                    </li>
                );
            })}
        </ul>
    );
};
