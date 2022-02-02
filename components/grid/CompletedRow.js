import { getGuessStatuses } from "libs/statuses";
import { Cell } from "./Cell";

export const CompletedRow = ({ guess, solution = "" }) => {
    const statuses = getGuessStatuses(guess, solution);

    return (
        <div className="flex justify-center space-x-1">
            {guess.split("").map((letter, i) => (
                <Cell key={i} value={letter} status={statuses[i]} />
            ))}
        </div>
    );
};
