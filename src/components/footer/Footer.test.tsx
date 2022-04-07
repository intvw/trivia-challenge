import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
    it('should render without crashing', () => {
        render(<Footer stage="start" hasError={false} onClick={() => {}} />);
    });

    it('should render with crashing message in button', () => {
        render(<Footer stage="start" hasError={true} onClick={() => {}} />);
        expect(screen.getByTestId('restart-button')).toBeInTheDocument();
    });

    it('should render the proper button text in start stage', () => {
        render(<Footer stage="start" hasError={false} onClick={() => {}} />);
        expect(screen.getByTestId('begin-button')).toBeInTheDocument();
    });

    it('should render the proper button text in durring stage', () => {
        render(<Footer stage="during" hasError={false} onClick={() => {}} />);
        expect(screen.getByTestId('true-button')).toBeInTheDocument();
        expect(screen.getByTestId('false-button')).toBeInTheDocument();
    });

    it('should render the proper button text in end stage', () => {
        render(<Footer stage="end" hasError={false} onClick={() => {}} />);
        expect(screen.getByTestId('play-again-button')).toBeInTheDocument();
    });
});
