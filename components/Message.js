import {
    XCircleIcon,
    ExclamationIcon,
    CheckCircleIcon,
    InformationCircleIcon,
} from "@heroicons/react/solid";

const Message = ({ title, type = "error", message }) => {
    let backgroundColor = "bg-red-50";
    let textColor = "text-red-800";
    switch (type) {
        case "error":
            backgroundColor = "bg-red-200";
            textColor = "text-red-800";
            break;
        case "success":
            backgroundColor = "bg-emerald-200";
            textColor = "text-emerald-800";
            break;
        case "alert":
            backgroundColor = "bg-amber-200";
            textColor = "text-amber-800";
            break;
        case "info":
            backgroundColor = "bg-blue-200";
            textColor = "text-blue-800";
            break;
    }
    return (
        <div className={`rounded-md ${backgroundColor} p-4`}>
            <div className="flex">
                <div className="shrink-0">
                    {
                        {
                            error: (
                                <XCircleIcon
                                    className="h-5 w-5 text-red-600"
                                    aria-hidden="true"
                                />
                            ),
                            success: (
                                <CheckCircleIcon
                                    className="h-5 w-5 text-emerald-600"
                                    aria-hidden="true"
                                />
                            ),
                            alert: (
                                <ExclamationIcon
                                    className="h-5 w-5 text-amber-600"
                                    aria-hidden="true"
                                />
                            ),
                            info: (
                                <InformationCircleIcon
                                    className="h-5 w-5 text-blue-600"
                                    aria-hidden="true"
                                />
                            ),
                        }[type]
                    }
                </div>
                <div className="ml-3">
                    <h3 className={`text-base ${textColor}`}>{title}</h3>
                    {message && (
                        <p className={`text-sm mt-2 ${textColor} opacity-90`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Message;
