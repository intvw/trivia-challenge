import { Stage } from '../../types';
import './Header.css';

type Props = {
    stage: Stage;
    category?: string;
    score?: string;
};

export const Header = (props: Props) => {
    const { stage = 'start', category, score } = props;
    return (
        <header className="header">
            {stage === 'start' ? (
                <BeginHeader />
            ) : stage === 'during' ? (
                <DuringHeader category={category} />
            ) : (
                <EndHeader score={score} />
            )}
        </header>
    );
};

const BeginHeader = () => (
    <span className="header__text header__text-capitalize">
        welcome to the trivia challenge!
    </span>
);
const DuringHeader = (props: Pick<Props, 'category'>) => (
    <span className="header__text header__text-capitalize">
        {props.category}
    </span>
);
const EndHeader = (props: Pick<Props, 'score'>) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px',
            alignItems: 'center',
            width: '100%',
        }}
    >
        <span className="header__text">You scored</span>
        <span className="header__text">{props.score}</span>
    </div>
);
