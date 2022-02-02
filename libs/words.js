import { WORDS } from "constants/wordlist";
import { VALIDGUESSES } from "constants/validGuesses";

export const isWordInWordList = (word) => {
    return (
        WORDS.includes(word.toLowerCase()) ||
        VALIDGUESSES.includes(word.toLowerCase())
    );
};

export const getWordSolution = () => {
    const index = getRandomInt(WORDS.length);
    return WORDS[index].toUpperCase();
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
