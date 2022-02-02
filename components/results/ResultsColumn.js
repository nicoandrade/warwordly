import ResultsEmptyRow from "components/results/ResultsEmptyRow";
import ResultsRow from "components/results/ResultsRow";

export default function ResultsColumn({
    statuses,
    amountLetters = 5,
    amountGuesses = 6,
    name,
    winner = false,
}) {
    return (
        <div>
            <div
                className={`text-center mb-3 p-1 ${
                    winner
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                } font-medium rounded-md text-sm`}
            >
                {name}
            </div>
            <div className="mb-5">
                <div className="space-y-1">
                    {statuses.map((row, i) => (
                        <ResultsRow
                            key={i}
                            row={row}
                            amountLetters={amountLetters}
                        />
                    ))}
                    {statuses.length < amountGuesses &&
                        Array.from(Array(amountGuesses - statuses.length)).map(
                            (_, i) => (
                                <ResultsEmptyRow
                                    key={i}
                                    amount={amountLetters}
                                />
                            )
                        )}
                </div>
            </div>
            {winner && (
                <div className="text-center uppercase text-green-700 font-bold">
                    <span className="mr-3">🏆</span>
                    Winner
                </div>
            )}
        </div>
    );
}
