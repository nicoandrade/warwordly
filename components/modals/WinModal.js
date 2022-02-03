import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

import Link from "next/link";

import { EmojiHappyIcon, EmojiSadIcon } from "@heroicons/react/outline";

export default function WinModal({
    isOpen,
    setIsOpen,
    variant = "lost",
    solution,
    battleId,
}) {
    let classes = "";
    if (variant === "lost") classes += " bg-red-200 text-red-900";
    if (variant === "win") classes += " bg-green-200 text-green-900";

    let classesOverlay = "";
    if (variant === "lost") classesOverlay += " bg-red-900";
    if (variant === "win") classesOverlay += " bg-green-900";

    let classesTitle = " text-red-800";
    if (variant === "win") classesTitle = " text-green-800";

    let title = "You Lost";
    if (variant === "win") title = "You Win";

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
                            className={`fixed inset-0  bg-opacity-90 transition-opacity ${classesOverlay}`}
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full  sm:my-8 sm:align-middle sm:max-w-sm sm:p-6">
                            <div>
                                <div
                                    className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full  ${
                                        "win" === variant
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    {"win" === variant && (
                                        <EmojiHappyIcon
                                            className="h-14 w-14 text-green-600"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {"lost" === variant && (
                                        <EmojiSadIcon
                                            className="h-14 w-14 text-red-600"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className={`text-4xl uppercase leading-6 font-black mb-5 ${classesTitle}`}
                                    >
                                        {title}
                                    </Dialog.Title>
                                    {"lost" === variant && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 mb-1">
                                                The word is
                                            </p>
                                            <span className="block text-2xl font-bold uppercase">
                                                {solution}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <Link
                                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/battles/${battleId}/results`}
                                    prefetch={false}
                                >
                                    <a className="btn btn-hero">Results</a>
                                </Link>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
