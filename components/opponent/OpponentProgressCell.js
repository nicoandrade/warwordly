export default function OpponentProgressCell({ status }) {
    let classes = "";

    if (!status) classes += " bg-white border-gray-200";
    if (status === "absent") classes += " bg-gray-200 border-gray-300";
    if (status === "correct") classes += " bg-green-600 border-green-600";
    if (status === "present") classes += " bg-orange-200 border-orange-300";

    return <li className={`w-3 h-3 sm:w-4 sm:h-4 border rounded ${classes}`} />;
}
