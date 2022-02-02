import { getStatuses } from "libs/statuses";
import Key from "./Key";
import { useEffect } from "react";

export default function Keyboard({ onChar, onDelete, onEnter, guesses }) {
    const charStatuses = getStatuses(guesses);

    const onClick = (value) => {
        if (value === "ENTER") {
            onEnter();
        } else if (value === "DELETE") {
            onDelete();
        } else {
            onChar(value);
        }
    };

    useEffect(() => {
        const listener = (e) => {
            if (e.code === "Enter") {
                onEnter();
            } else if (e.code === "Backspace") {
                onDelete();
            } else {
                const key = e.key.toUpperCase();
                if (key.length === 1 && key >= "A" && key <= "Z") {
                    onChar(key);
                }
            }
        };
        window.addEventListener("keyup", listener);
        return () => {
            window.removeEventListener("keyup", listener);
        };
    }, [onEnter, onDelete, onChar]);

    return (
        <div className="space-y-1 mx-1 mb-3">
            <div className="flex justify-center space-x-1">
                <Key value="Q" onClick={onClick} status={charStatuses["Q"]} />
                <Key value="W" onClick={onClick} status={charStatuses["W"]} />
                <Key value="E" onClick={onClick} status={charStatuses["E"]} />
                <Key value="R" onClick={onClick} status={charStatuses["R"]} />
                <Key value="T" onClick={onClick} status={charStatuses["T"]} />
                <Key value="Y" onClick={onClick} status={charStatuses["Y"]} />
                <Key value="U" onClick={onClick} status={charStatuses["U"]} />
                <Key value="I" onClick={onClick} status={charStatuses["I"]} />
                <Key value="O" onClick={onClick} status={charStatuses["O"]} />
                <Key value="P" onClick={onClick} status={charStatuses["P"]} />
            </div>
            <div className="flex justify-center space-x-1">
                <Key value="A" onClick={onClick} status={charStatuses["A"]} />
                <Key value="S" onClick={onClick} status={charStatuses["S"]} />
                <Key value="D" onClick={onClick} status={charStatuses["D"]} />
                <Key value="F" onClick={onClick} status={charStatuses["F"]} />
                <Key value="G" onClick={onClick} status={charStatuses["G"]} />
                <Key value="H" onClick={onClick} status={charStatuses["H"]} />
                <Key value="J" onClick={onClick} status={charStatuses["J"]} />
                <Key value="K" onClick={onClick} status={charStatuses["K"]} />
                <Key value="L" onClick={onClick} status={charStatuses["L"]} />
            </div>
            <div className="flex justify-center space-x-1">
                <Key value="DELETE" onClick={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            d="M21,4H6.109c-0.69,0-1.331,0.355-1.696,0.94L0,12l4.412,7.06C4.778,19.645,5.419,20,6.109,20H21c1.105,0,2-0.895,2-2V6 C23,4.895,22.105,4,21,4z M18,15.59L16.59,17L13,13.41L9.41,17L8,15.59L11.59,12L8,8.41L9.41,7L13,10.59L16.59,7L18,8.41L14.41,12 L18,15.59z"
                            fill="currentColor"
                        />
                    </svg>
                </Key>
                <Key value="Z" onClick={onClick} status={charStatuses["Z"]} />
                <Key value="X" onClick={onClick} status={charStatuses["X"]} />
                <Key value="C" onClick={onClick} status={charStatuses["C"]} />
                <Key value="V" onClick={onClick} status={charStatuses["V"]} />
                <Key value="B" onClick={onClick} status={charStatuses["B"]} />
                <Key value="N" onClick={onClick} status={charStatuses["N"]} />
                <Key value="M" onClick={onClick} status={charStatuses["M"]} />
                <Key value="ENTER" onClick={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            d="M19,3h-6c-1.103,0-2,0.897-2,2v4H5c-1.103,0-2,0.897-2,2v8c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2V5 C21,3.897,20.103,3,19,3z M17,12c0,2.206-1.794,4-4,4h-3v2l-3-3l3-3v2h3c1.103,0,2-0.897,2-2V8h2V12z"
                            fill="currentColor"
                        />
                    </svg>
                </Key>
            </div>
        </div>
    );
}
