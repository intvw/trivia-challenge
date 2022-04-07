import { Stage } from '../../types';
import './Footer.css';

type Props = {
    stage: Stage;
    hasError: boolean;
    onClick: (data?: 'True' | 'False') => void;
};

export const Footer = (props: Props) => {
    const { stage = 'start', hasError = false, onClick } = props;
    return (
        <footer className="footer">
            {!hasError ? (
                stage === 'start' ? (
                    <BeginFooter onClick={onClick} />
                ) : stage === 'during' ? (
                    <DuringFooter onClick={onClick} />
                ) : (
                    <EndFooter onClick={onClick} />
                )
            ) : (
                <ErrorFooter onClick={onClick} />
            )}
        </footer>
    );
};

const ErrorFooter = (props: Pick<Props, 'onClick'>) => (
    <button
        aria-label="Restart"
        tabIndex={0}
        data-testid="restart-button"
        className="footer__buttons"
        onClick={() => props.onClick()}
    >
        RESTART GAME
    </button>
);
const BeginFooter = (props: Pick<Props, 'onClick'>) => (
    <button
        aria-label="Begin"
        tabIndex={0}
        data-testid="begin-button"
        className="footer__buttons"
        onClick={() => props.onClick()}
    >
        BEGIN
    </button>
);
const DuringFooter = (props: Pick<Props, 'onClick'>) => (
    <>
        <button
            aria-label="True"
            tabIndex={0}
            data-testid="true-button"
            className="footer__buttons"
            onClick={() => props.onClick('True')}
        >
            TRUE
        </button>
        <button
            aria-label="False"
            data-testid="false-button"
            className="footer__buttons"
            onClick={() => props.onClick('False')}
        >
            FALSE
        </button>
    </>
);
const EndFooter = (props: Pick<Props, 'onClick'>) => (
    <button
        tabIndex={0}
        aria-label="Play Again"
        data-testid="play-again-button"
        className="footer__buttons"
        onClick={() => props.onClick()}
    >
        PLAY AGAIN?
    </button>
);
