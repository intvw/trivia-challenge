import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('should render without crashing', () => {
        render(<Header stage="start" />);
    });

    it('should render the proper title in start stage', () => {
        render(<Header stage="start" />);
        expect(
            screen.getByText(/welcome to the trivia challenge!/i),
        ).toBeInTheDocument();
    });

    it('should render the proper title in during stage', () => {
        render(<Header stage="during" category="Sport" />);
        expect(screen.getByText(/sport/i)).toBeInTheDocument();
    });

    it('should render the proper title in end stage', () => {
        render(<Header stage="end" score="5 / 10" />);
        expect(screen.getByText(/you scored/i)).toBeInTheDocument();
        expect(screen.getByText(/5 \/ 10/i)).toBeInTheDocument();
    });
});
