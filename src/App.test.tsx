import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import nock from 'nock';
import App from './App';

describe('App', () => {
    let scope: any;

    beforeEach(() => {
        scope = nock('https://opentdb.com')
            .get('/api.php')
            .query({
                amount: 10,
                difficulty: /(easy)|(medium)|(hard)/,
                type: 'boolean',
            })
            .once()
            .reply(
                200,
                {
                    response_code: 0,
                    results: [
                        {
                            question: 'Question of History',
                            category: 'History',
                            correct_answer: 'True',
                            incorrect_answers: ['False'],
                        },
                        {
                            question: 'Question of Science',
                            category: 'Science',
                            correct_answer: 'True',
                            incorrect_answers: ['False'],
                        },
                        {
                            question: 'Question of Technology',
                            category: 'Technology',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Sports',
                            category: 'Sports',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Science',
                            category: 'Science',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Music',
                            category: 'Music',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of History',
                            category: 'History',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Art',
                            category: 'Art',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Science',
                            category: 'Science',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                        {
                            question: 'Question of Science',
                            category: 'Science',
                            correct_answer: 'False',
                            incorrect_answers: ['True'],
                        },
                    ],
                },
                { 'Access-Control-Allow-Origin': '*' },
            );
    });

    it('should render without crashing', () => {
        render(<App />);
    });

    describe('when the stage is "start"', () => {
        it('should have a welcome text in header section', () => {
            const { getByText } = render(<App />);
            const welcome = getByText(/welcome to the trivia challenge!/i);
            expect(welcome).toBeInTheDocument();
        });

        it('should have a loading text in main section', () => {
            const { getByText } = render(<App />);
            const intro = getByText(/loading.../i);
            expect(intro).toBeInTheDocument();
        });

        it('should have a begin text in footer section', () => {
            const { getByText } = render(<App />);
            const action = getByText(/begin/i);
            expect(action).toBeInTheDocument();
        });
    });

    describe('when the stage is "during"', () => {
        it('should verify text contents on page for the first question when BEGIN button is clicked', async () => {
            let { getByText, getByTestId } = render(<App />);
            await waitFor(() => {
                expect(
                    getByText(
                        /you will be presented with 10 true or false questions/i,
                    ),
                ).toBeInTheDocument();
            });

            clickButton(getByTestId('begin-button'));

            await waitFor(() => {
                expect(getByText('History')).toBeInTheDocument();
                expect(getByText('Question of History')).toBeInTheDocument();
                expect(getByText('1 of 10')).toBeInTheDocument();
                expect(getByTestId('true-button')).toBeInTheDocument();
                expect(getByTestId('false-button')).toBeInTheDocument();
            });

            scope.done();
        });

        it('should verify text contents on page for the last question when TRUE/FALSE buttons is clicked', async () => {
            let { getByText, getByTestId } = render(<App />);
            await waitFor(() => {
                expect(
                    getByText(
                        /you will be presented with 10 true or false questions/i,
                    ),
                ).toBeInTheDocument();
            });

            clickButton(getByText(/begin/i));

            await waitFor(() => {
                expect(getByTestId('true-button')).toBeInTheDocument();
            });

            [...Array(9)].forEach(() => {
                const answer = ['TRUE', 'FALSE'][Math.floor(Math.random() * 2)];
                clickButton(getByText(answer));
            });

            await waitFor(() => {
                expect(getByText('Science')).toBeInTheDocument();
                expect(getByText('Question of Science')).toBeInTheDocument();
                expect(getByText('10 of 10')).toBeInTheDocument();
                expect(getByTestId('true-button')).toBeInTheDocument();
                expect(getByTestId('false-button')).toBeInTheDocument();
            });

            scope.done();
        });
    });

    describe('when the stage is "end"', () => {
        it('should have a you scored text in header section', async () => {
            let { getByText, getByTestId } = render(<App />);
            await waitFor(() => {
                expect(
                    getByText(
                        /you will be presented with 10 true or false questions/i,
                    ),
                ).toBeInTheDocument();
            });

            clickButton(getByTestId('begin-button'));

            await waitFor(() => {
                expect(getByTestId('true-button')).toBeInTheDocument();
                [...Array(9)].forEach(() => {
                    clickButton(getByTestId('true-button'));
                });

                expect(getByText('10 of 10')).toBeInTheDocument();

                clickButton(getByTestId('true-button'));
            });

            await waitFor(() => {
                expect(getByText(/you scored/i)).toBeInTheDocument();
                expect(getByText(/2 \/ 10/i)).toBeInTheDocument();
                expect(getByTestId('play-again-button')).toBeInTheDocument();
            });

            scope.done();
        });
    });
});

const clickButton = (element: HTMLElement) =>
    fireEvent.click(
        element,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    );
