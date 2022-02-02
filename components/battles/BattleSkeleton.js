export default function BattleSkeleton() {
    const amountLetters = 5;
    const amountGuesses = 6;

    return (
        <div className="flex justify-center mx-auto w-full">
            <div className="mt-10 sm:mt-12 mx-2 sm:mx-4">
                <div className="space-y-1">
                    {Array.from(Array(amountGuesses)).map((_, i) => (
                        <div key={i} className="flex justify-center space-x-1">
                            {Array.from(Array(amountLetters)).map((_, i) => (
                                <div
                                    key={i}
                                    className={`loading w-14 h-14 flex rounded-lg`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="h-10 sm:h-12 flex flex-wrap justify-center items-center w-full">
                    <span className="block loading  rounded-full w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex flex-col space-y-1 px-2 sm:px-4 border-l border-gray-100">
                    {Array.from(Array(amountGuesses)).map((_, i) => (
                        <div key={i} className="h-14 flex items-center">
                            <ul
                                className={`grid grid-cols-3 sm:grid-cols-${amountLetters} gap-1`}
                            >
                                {Array.from(Array(amountLetters)).map(
                                    (x, i) => (
                                        <li
                                            key={i}
                                            className={`loading w-3 h-3 sm:w-4 sm:h-4 rounded`}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
