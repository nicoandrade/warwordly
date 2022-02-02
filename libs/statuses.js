//import { solution } from "./words";

export const getStatuses = (guesses, solution) => {
    if (!solution) return [];

    const charObj = {};

    guesses.forEach((word) => {
        word.split("").forEach((letter, i) => {
            if (!solution.includes(letter)) {
                // make status absent
                return (charObj[letter] = "absent");
            }

            if (letter === solution[i]) {
                //make status correct
                return (charObj[letter] = "correct");
            }

            if (charObj[letter] !== "correct") {
                //make status present
                return (charObj[letter] = "present");
            }
        });
    });

    return charObj;
};

export const getGuessStatuses = (guess, solution) => {
    if (!solution) return [];
    const splitSolution = solution.split("");
    const splitGuess = guess.split("");

    const solutionCharsTaken = splitSolution.map((_) => false);

    const statuses = Array.from(Array(guess.length));

    // handle all correct cases first
    splitGuess.forEach((letter, i) => {
        if (letter === splitSolution[i]) {
            statuses[i] = "correct";
            solutionCharsTaken[i] = true;
            return;
        }
    });

    splitGuess.forEach((letter, i) => {
        if (statuses[i]) return;

        if (!splitSolution.includes(letter)) {
            // handles the absent case
            statuses[i] = "absent";
            return;
        }

        // now we are left with "present"s
        const indexOfPresentChar = splitSolution.findIndex(
            (x, index) => x === letter && !solutionCharsTaken[index]
        );

        if (indexOfPresentChar > -1) {
            statuses[i] = "present";
            solutionCharsTaken[indexOfPresentChar] = true;
            return;
        } else {
            statuses[i] = "absent";
            return;
        }
    });

    return statuses;
};
