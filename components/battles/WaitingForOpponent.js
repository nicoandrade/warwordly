import { useState } from "react";

import Logo from "components/Logo";
import Spin from "components/Spin";
import { DuplicateIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function WaitingForOpponent({ battleId }) {
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/battles/${battleId}`;

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <h1 className="flex items-center text-2xl font-bold text-amber-600 mb-5">
                <Logo className=" w-auto h-6 mr-4" logoMinimal={true} />
                New Battle
            </h1>
            <p className="text-lg mb-4">Share this link with your opponent</p>
            <div className="flex items-center mb-8">
                <div className="py-4 px-5 h-12 bg-gray-100 rounded-md text-xs truncate mr-3 select-all font-mono">
                    {url}
                </div>

                <CopyToClipboard
                    text={url}
                    onCopy={() => setCopiedToClipboard(true)}
                >
                    <button
                        type="button"
                        className={`btn p-3 h-12 flex-shrink-0 transition-colors ${
                            copiedToClipboard
                                ? "bg-green-200 text-green-700 hover:bg-green-200 hover:text-green-700"
                                : ""
                        }`}
                    >
                        {copiedToClipboard ? (
                            <ClipboardCheckIcon className="w-5 h-5 fill-current" />
                        ) : (
                            <DuplicateIcon className="w-5 h-5 fill-current" />
                        )}
                    </button>
                </CopyToClipboard>
            </div>

            <div className="flex items-center justify-center mb-3">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-full">
                    <Spin className="w-12 h-12 text-gray-400" />
                </div>
            </div>
            <h2 className="text-center text-gray-400">Waiting for opponent</h2>
        </div>
    );
}
