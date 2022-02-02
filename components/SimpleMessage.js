import { XCircleIcon } from "@heroicons/react/solid";

export default function SimpleMessage({ title }) {
    return (
        <div className="rounded-md bg-red-200 p-4">
            <div className="flex">
                <div className="shrink-0">
                    <XCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-500">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
}
