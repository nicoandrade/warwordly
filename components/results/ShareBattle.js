import { Fragment, useState, useRef } from "react";
import { Transition, Dialog } from "@headlessui/react";

import { PhotographIcon, LinkIcon } from "@heroicons/react/outline";
import { ClipboardCheckIcon } from "@heroicons/react/solid";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ShareBattle({ battleId, imageURL }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);
    let modalRef = useRef(null);

    const battleURL = `${process.env.NEXT_PUBLIC_SITE_URL}/battles/${battleId}/results`;

    return (
        <div>
            <h3 className="text-center text-xl uppercase text-blue-500 font-bold mt-12 mb-4">
                Share
            </h3>
            <ul className="flex justify-center items-center space-x-7">
                <li>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `Check out my battle on WarWordly \n\n${battleURL}`
                        )}`}
                        rel="noreferrer"
                        target="_blank"
                        className="inline-flex items-center justify-center p-5 bg-gray-100 hover:bg-gray-200 rounded-full text-blue-500"
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpenModal(true);
                        }}
                        className="inline-flex items-center justify-center p-5 bg-gray-100 hover:bg-gray-200 rounded-full text-blue-500"
                    >
                        <PhotographIcon className="w-6 h-6" />
                    </a>
                </li>
            </ul>

            <Transition.Root show={isOpenModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={setIsOpenModal}
                    initialFocus={modalRef}
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
                                className={`fixed inset-0 bg-black  bg-opacity-80 transition-opacity `}
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
                            <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-xl sm:p-6">
                                <h4 className="text-center text-xl mb-5 text-gray-700 font-bold">
                                    Share with your friends
                                </h4>
                                {battleId && imageURL && (
                                    <img
                                        src={imageURL}
                                        alt="Share image"
                                        className="block w-full rounded-lg overflow-hidden shadow-md mb-6"
                                        ref={modalRef}
                                    />
                                )}

                                <div className="flex flex-wrap sm:flex-nowrap justify-center space-x-0 space-y-4 sm:space-x-6 sm:space-y-0">
                                    <a
                                        className="btn w-full sm:w-auto"
                                        href={imageURL}
                                        target="_blank"
                                        rel="noreferrer"
                                        download="battle.jpg"
                                    >
                                        <PhotographIcon className="w-6 h-6 mr-3" />
                                        Download Image
                                    </a>
                                    <CopyToClipboard
                                        text={battleURL}
                                        onCopy={() =>
                                            setCopiedToClipboard(true)
                                        }
                                    >
                                        <button
                                            type="button"
                                            className={`btn w-full sm:w-auto transition-colors ${
                                                copiedToClipboard
                                                    ? "bg-green-200 text-green-700 hover:bg-green-200 hover:text-green-700"
                                                    : ""
                                            }`}
                                        >
                                            {copiedToClipboard ? (
                                                <>
                                                    <ClipboardCheckIcon className="w-6 h-6 mr-3" />
                                                    Copied Link
                                                </>
                                            ) : (
                                                <>
                                                    <LinkIcon className="w-6 h-6 mr-3" />
                                                    Copy Link
                                                </>
                                            )}
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
