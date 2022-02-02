import OpponentProgressRow from "components/opponent/OpponentProgressRow";
import OpponentProgressEmptyRow from "components/opponent/OpponentProgressEmptyRow";

export default function OpponentProgress({
    guesses,
    loading = true,
    solution,
}) {
    const amountLetters = 5;
    const empties =
        guesses.length < 6 ? Array.from(Array(6 - guesses.length)) : [];
    return (
        <div className="flex flex-col space-y-1 px-2 sm:px-4 border-l border-gray-100">
            {loading ? (
                <>
                    {Array.from(Array(6)).map((_, i) => (
                        <div key={i} className="h-14 flex items-center">
                            <ul
                                className={`grid grid-cols-3 sm:grid-cols-${amountLetters} gap-1`}
                            >
                                {Array.from(Array(5)).map((x, i) => (
                                    <li
                                        key={i}
                                        className={`loading w-3 h-3 sm:w-4 sm:h-4 rounded`}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {guesses.map((guess, i) => (
                        <OpponentProgressRow
                            key={i}
                            guess={guess}
                            solution={solution}
                        />
                    ))}

                    {empties.map((_, i) => (
                        <OpponentProgressEmptyRow
                            key={i}
                            amount={amountLetters}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
