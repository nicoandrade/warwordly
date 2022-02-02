import ResultsCell from "components/results/ResultsCell";

export default function ResultsRow({ row, amountLetters = 5 }) {
    return (
        <ul className={`grid grid-cols-${amountLetters} gap-1`}>
            {row.map((cell, m) => (
                <ResultsCell status={cell} key={m} />
            ))}
        </ul>
    );
}
