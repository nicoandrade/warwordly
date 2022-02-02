import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

import { AuthRedirect, useUser } from "hooks/authUser";

import ButtonSubmit from "components/ButtonSubmit";
import Message from "components/Message";
import Logo from "components/Logo";

import { NextSeo } from "next-seo";

export default function Login() {
    AuthRedirect();
    const router = useRouter();

    const { redirectTo } = router.query;

    const { signIn } = useUser();

    const [formLoading, setFormLoading] = useState(false);
    const [message, setMessage] = useState({
        messageShow: false,
        messageType: "loading",
        messageTitle: "",
        message: "",
    });

    const [email, setEmail] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setFormLoading(true);
        setMessage({
            messageShow: false,
            messageType: "error",
            messageTitle: "",
            message: "",
        });

        try {
            const { error } = await signIn(
                {
                    email: email,
                },
                {
                    redirectTo: redirectTo || null,
                }
            );
            if (error) throw error;

            setMessage({
                messageShow: true,
                messageType: "success",
                messageTitle: "Magic Link sent, check your email",
            });
            setFormLoading(false);
        } catch (error) {
            const message = error.error_description || error.message;
            setMessage({
                messageShow: true,
                messageType: "error",
                messageTitle: message,
            });
            setFormLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <NextSeo title={"Login - WarWordly"} />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <Link href="/">
                        <a>
                            <Logo className="fill-current h-10 text-gray-400" />
                        </a>
                    </Link>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" py-8 px-4 sm:px-10">
                    <h1 className="mb-3 text-2xl font-bold text-gray-600">
                        Login with your email
                    </h1>
                    <p className="mb-6">
                        We will email you a magic sign in link.
                    </p>
                    <form
                        className="space-y-6"
                        onSubmit={(e) => handleLogin(e)}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="janesmith@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <ButtonSubmit
                                loading={formLoading}
                                text="Send Magic Link"
                            />
                        </div>

                        {message.messageShow && (
                            <Message
                                title={message.messageTitle}
                                type={message.messageType}
                            />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
