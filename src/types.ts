export type Stage = 'start' | 'during' | 'end';
export type Answer = 'True' | 'False';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Ask = {
    category: string;
    difficulty: Difficulty;
    question: string;
    correct_answer: Answer;
    incorrect_answers: Answer[];
    type: string;
};
