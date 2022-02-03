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
