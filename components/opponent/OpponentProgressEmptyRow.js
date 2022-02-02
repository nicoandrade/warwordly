import OpponentProgressCell from "components/opponent/OpponentProgressCell";

export default function OpponentProgressEmptyRow({ amount = 5 }) {
    return (
        <div className="h-14 flex items-center">
            <ul className={`grid grid-cols-3 sm:grid-cols-${amount} gap-1`}>
                {[...Array(amount)].map((x, i) => (
                    <OpponentProgressCell key={i} />
                ))}
            </ul>
        </div>
    );
}
