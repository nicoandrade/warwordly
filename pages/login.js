import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import { useUser } from "hooks/authUser";

import Header from "components/Header";
import ButtonSubmit from "components/ButtonSubmit";
import Message from "components/Message";
import Logo from "components/Logo";

import { NextSeo } from "next-seo";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { supabase } from "libs/initSupabase";

export default function Login() {
    const router = useRouter();

    const { t } = useTranslation(["common", "login"]);

    const { redirectTo } = router.query;

    const { user, signIn } = useUser();

    const [formLoading, setFormLoading] = useState(false);
    const [message, setMessage] = useState({
        messageShow: false,
        messageType: "loading",
        messageTitle: "",
        message: "",
    });

    const [messageSocial, setMessageSocial] = useState({
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
                messageTitle: t("responseSentTitle", { ns: "login" }),
                message: t("responseSentMessage", { ns: "login" }),
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

    const handleSocialLogin = async (e, provider) => {
        e.preventDefault();

        try {
            const { user, session, error } = await supabase.auth.signIn({
                provider: provider,
            });
            if (error) throw error;
        } catch (error) {
            const message = error.error_description || error.message;
            setMessageSocial({
                messageShow: true,
                messageType: "error",
                messageTitle: message,
            });
        }
    };

    useEffect(() => {
        if (user && redirectTo) {
            router.push(redirectTo);
        } else if (user) {
            router.push("/");
        }
    }, [user, router, redirectTo]);

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
                        {t("title", { ns: "login" })}
                    </h1>
                    <p className="mb-6">{t("description", { ns: "login" })}</p>
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
                                text={t("sendMagicLink", { ns: "login" })}
                            />
                        </div>

                        {message.messageShow && (
                            <Message
                                title={message.messageTitle}
                                message={message.message}
                                type={message.messageType}
                            />
                        )}
                    </form>

                    <div className="mt-5">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {t("orLoginWith", { ns: "login" })}
                                </span>
                            </div>
                        </div>
                        <div className="mt-5 space-y-3">
                            <button
                                type="button"
                                onClick={(e) => handleSocialLogin(e, "twitter")}
                                className="btn w-full text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-blue-200"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                                Twitter
                            </button>

                            <button
                                type="button"
                                onClick={(e) =>
                                    handleSocialLogin(e, "facebook")
                                }
                                className="btn w-full text-[#1871ed] bg-indigo-100 hover:text-indigo-700 hover:bg-indigo-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path d="M17,3H7C4.791,3,3,4.791,3,7v10c0,2.209,1.791,4,4,4h5.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H17c2.209,0,4-1.791,4-4V7C21,4.791,19.209,3,17,3z" />
                                </svg>
                                Facebook
                            </button>

                            {messageSocial.messageShow && (
                                <Message
                                    title={messageSocial.messageTitle}
                                    message={messageSocial.message}
                                    type={messageSocial.messageType}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "login"])),
    },
});
