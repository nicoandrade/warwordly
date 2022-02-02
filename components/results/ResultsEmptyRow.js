import ResultsCell from "components/results/ResultsCell";

export default function ResultsEmptyRow({ amount = 5 }) {
    return (
        <ul className={`grid grid-cols-${amount} gap-1`}>
            {[...Array(amount)].map((x, i) => (
                <ResultsCell key={i} />
            ))}
        </ul>
    );
}
