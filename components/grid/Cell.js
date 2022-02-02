export const Cell = ({ value, status }) => {
    let classes = "";

    if (!status) classes += " bg-white border-gray-200";
    if (value && !status) classes += " border-black";
    if (status === "absent")
        classes += " bg-gray-200 text-gray-500 border-gray-300";
    if (status === "correct")
        classes += " bg-green-600 text-white border-green-600";
    if (status === "present")
        classes += " bg-orange-200 text-orange-600 border-orange-300";
    if (!!value) classes += " cell-animation";

    return (
        <div
            className={`w-14 h-14 border-solid border-2 flex items-center justify-center text-lg font-bold rounded-lg ${classes}`}
        >
            {value}
        </div>
    );
};
