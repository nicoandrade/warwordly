import ResultsCell from "components/results/ResultsCell";

export default function ResultsRow({ row, amountLetters = 5 }) {
    let gridClass = "grid-cols-5";

    // This because Tailwind does't read dynamic classes
    switch (amountLetters) {
        case 6:
            gridClass = "grid-cols-6";
            break;
        case 7:
            gridClass = "grid-cols-7";
            break;
        case 8:
            gridClass = "grid-cols-8";
            break;
        case 9:
            gridClass = "grid-cols-9";
            break;
        case 10:
            gridClass = "grid-cols-10";
            break;
    }

    return (
        <ul className={`grid ${gridClass} gap-1`}>
            {row.map((cell, m) => (
                <ResultsCell status={cell} key={m} />
            ))}
        </ul>
    );
}
