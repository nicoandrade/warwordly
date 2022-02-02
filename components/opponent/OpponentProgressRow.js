import OpponentProgressCell from "components/opponent/OpponentProgressCell";

import { getGuessStatuses } from "libs/statuses";

export default function OpponentProgressRow({ guess, solution }) {
    const statuses = getGuessStatuses(guess, solution);

    return (
        <div className="h-14 flex items-center">
            <ul className="grid grid-cols-3 sm:grid-cols-5 gap-1">
                {guess.split("").map((letter, i) => (
                    <OpponentProgressCell key={i} status={statuses[i]} />
                ))}
            </ul>
        </div>
    );
}
