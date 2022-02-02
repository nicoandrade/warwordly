import { Cell } from "./Cell";

export const CurrentRow = ({ guess }) => {
    const splitGuess = guess.split("");
    const emptyCells = Array.from(Array(5 - splitGuess.length));

    return (
        <div className="flex justify-center space-x-1">
            {splitGuess.map((letter, i) => (
                <Cell key={i} value={letter} />
            ))}
            {emptyCells.map((_, i) => (
                <Cell key={i} />
            ))}
        </div>
    );
};
