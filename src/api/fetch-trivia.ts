import { Ask, Difficulty } from '../types';

export const fetchTrivia = async (
    difficulty: Difficulty,
): Promise<{ results: Ask[]; response_code: number }> => {
    const response = await fetch(
        `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`,
    );
    return await response.json();
};
