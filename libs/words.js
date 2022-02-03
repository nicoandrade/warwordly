//import { WORDS } from "constants/wordlist";
//import { VALIDGUESSES } from "constants/validGuesses";

export const isWordInWordList = async (word, locale = "en") => {
    const { WORDS } = await import(`constants/${locale}/wordlist.js`);
    const { VALIDGUESSES } = await import(
        `constants/${locale}/validGuesses.js`
    );

    return (
        WORDS.includes(word.toLowerCase()) ||
        VALIDGUESSES.includes(word.toLowerCase())
    );
};

export const getWordSolution = async (locale = "en") => {
    const { WORDS } = await import(`constants/${locale}/wordlist.js`);
    const index = getRandomInt(WORDS.length);
    return WORDS[index].toUpperCase();
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
