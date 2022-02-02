export default function ResultsColumnSkeleton() {
    const amountLetters = 5;
    const amountGuesses = 6;
    return (
        <div>
            <div className={`loading h-7 w-full mb-3 rounded-md`} />

            <div className="mb-5">
                <div className="space-y-1">
                    {Array.from(Array(amountGuesses)).map((_, i) => (
                        <div key={i} className="flex justify-center space-x-1">
                            {Array.from(Array(amountLetters)).map((_, i) => (
                                <div
                                    key={i}
                                    className={`loading w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-md`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
