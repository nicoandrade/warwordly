export default function ResultsCell({ status }) {
    let classes = "";

    if (!status) classes += " bg-white border-gray-200";
    if (status === "absent") classes += " bg-gray-200 border-gray-300";
    if (status === "correct") classes += " bg-green-600 border-green-600";
    if (status === "present") classes += " bg-orange-200 border-orange-300";

    return (
        <li
            className={`w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-md ${classes}`}
        />
    );
}
