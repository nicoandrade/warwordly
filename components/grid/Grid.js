import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

export default function Grid({
    guesses,
    currentGuess,
    loading = true,
    solution,
}) {
    const empties =
        guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

    return (
        <div className="space-y-1">
            {loading ? (
                <>
                    {Array.from(Array(6)).map((_, i) => (
                        <div key={i} className="flex justify-center space-x-1">
                            {Array.from(Array(5)).map((_, i) => (
                                <div
                                    key={i}
                                    className={`loading w-14 h-14 flex rounded-lg`}
                                />
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {guesses.map((guess, i) => (
                        <CompletedRow
                            key={i}
                            guess={guess}
                            solution={solution}
                        />
                    ))}
                    {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
                    {empties.map((_, i) => (
                        <EmptyRow key={i} />
                    ))}
                </>
            )}
        </div>
    );
}
