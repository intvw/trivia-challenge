import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Board } from './Board';
import { Ask } from '../../types';

describe('Board', () => {
    let asks: Ask[] = [
        {
            question: 'Question of History',
            category: 'History',
            correct_answer: 'True',
            incorrect_answers: ['False'],
            difficulty: 'easy',
            type: 'boolean',
        },
        {
            question: 'Question of Science',
            category: 'Science',
            correct_answer: 'True',
            incorrect_answers: ['False'],
            difficulty: 'hard',
            type: 'boolean',
        },
    ];

    it('should render without crashing', () => {
        render(
            <Board
                stage="start"
                asks={[]}
                hasError={false}
                currentAskIndex={0}
                answers={[]}
            />,
        );
    });

    it('should render with crashing message', () => {
        render(<Board stage="start" asks={[]} hasError={true} />);
        expect(
            screen.getByText(/something went wrong. please restart game./i),
        ).toBeInTheDocument();
    });

    it('should render the proper content in start stage with', () => {
        render(<Board stage="start" asks={[]} hasError={false} />);
        expect(screen.getByText(/loading../i)).toBeInTheDocument();

        render(<Board stage="start" asks={asks} hasError={false} />);
        expect(
            screen.getByText(
                /you will be presented with 2 true or false questions./i,
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(/can you score 100%?/i)).toBeInTheDocument();
    });

    it('should render the proper content in start stage', () => {
        render(<Board stage="start" asks={asks} hasError={false} />);
        expect(
            screen.getByText(
                /you will be presented with 2 true or false questions./i,
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(/can you score 100%?/i)).toBeInTheDocument();
    });

    it('should render the proper content in during stage', () => {
        render(
            <Board
                stage="during"
                asks={asks}
                currentAskIndex={1}
                hasError={false}
            />,
        );
        expect(screen.getByText(/question of science/i)).toBeInTheDocument();
        expect(screen.getByText(/2 of 2/i)).toBeInTheDocument();
    });

    it('should render the proper content in end stage', () => {
        render(
            <Board
                stage="end"
                asks={asks}
                hasError={false}
                currentAskIndex={2}
                answers={['False', 'True']}
            />,
        );
        const questionOne = screen.getByText(/question of history/i);
        const questionTwo = screen.getByText(/question of science/i);

        fireEvent.click(questionOne);
        fireEvent.click(questionTwo);

        expect(questionOne).toBeInTheDocument();
        expect(questionTwo).toBeInTheDocument();

        expect(screen.getAllByText(/answered incorrectly!/i).length).toBe(1);
        expect(screen.getAllByText(/correct answer is true/i).length).toBe(1);
        expect(screen.getAllByText(/answered correctly!/i).length).toBe(1);
    });
});
