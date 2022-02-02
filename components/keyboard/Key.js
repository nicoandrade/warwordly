export default function Key({ children, status, width = 40, value, onClick }) {
    let classes = "";

    if (!status)
        classes +=
            " bg-gray-200 md:hover:bg-gray-300 active:bg-gray-400 text-gray-700 md:hover:text-gray-800 active:text-gray-900";
    if (status === "absent") classes += " bg-gray-400 text-white";
    if (status === "correct") classes += " bg-green-600 text-white";
    if (status === "present") classes += " bg-orange-500 text-white";

    if (value === "ENTER" || value === "DELETE") classes += " w-20";

    const handleClick = (event) => {
        onClick(value);
        event.currentTarget.blur();
    };

    return (
        <button
            className={`w-14 h-14 flex items-center justify-center rounded text-xs sm:text-base font-bold cursor-pointer select-none ${classes}`}
            onClick={handleClick}
        >
            {children || value}
        </button>
    );
}
