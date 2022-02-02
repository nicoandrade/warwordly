import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

export default function Alert({
    isOpen,
    setIsOpen,
    message,
    variant = "warning",
}) {
    let classes = "";
    if (variant === "warning") classes += " bg-red-200 text-red-900";
    if (variant === "success") classes += " bg-green-200 text-green-900";

    let classesOverlay = "";
    if (variant === "warning") classesOverlay += " bg-red-900";
    if (variant === "success") classesOverlay += " bg-green-900";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setIsOpen}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className={`fixed inset-0  bg-opacity-80 transition-opacity ${classesOverlay}`}
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={`block align-bottom rounded-lg p-4 text-center font-medium overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full sm:p-6 text-base sm:text-lg ${classes}`}
                        >
                            <Dialog.Title as="h3">{message}</Dialog.Title>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
