import { useState } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import Logo from "components/Logo";
import Header from "components/Header";
import Footer from "components/Footer";
import SimpleMessage from "components/SimpleMessage";
import Spin from "components/Spin";

import { useUser } from "hooks/authUser";

import { getWordSolution } from "libs/words";

import { supabase } from "libs/initSupabase";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
    const router = useRouter();

    const { locale: activeLocale } = router;

    const [message, setMessage] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const { user } = useUser();

    const { t } = useTranslation(["common", "home"]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If the user is null (not false) means that we don't know yet if it is logged in or not
        if (null === user) return;

        setFormLoading(true);

        if (user) {
            // If the user is already logged in, we create the new battle
            try {
                const solution = await getWordSolution(activeLocale);

                const dataToInsert = {
                    player1: user.id,
                    solution: solution,
                    language: activeLocale,
                };

                const { data, error } = await supabase
                    .from("battles")
                    .insert(dataToInsert)
                    .single();

                if (error) throw error;

                router.push(`/battles/${data.id}`);
            } catch (e) {
                setMessage(e.message);
                setFormLoading(false);
            }
        } else {
            router.push(`/login`);
        }
    };

    return (
        <div>
            <Header logoMinimal={true} />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="flex justify-center mb-5">
                    <Logo className="fill-current text-hero w-auto h-10 sm:h-12" />
                </div>
                <p className="text-center">
                    {t("description", { ns: "home" })}
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-36">
                <div className="flex justify-center mb-5">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full sm:w-auto py-6 px-8 text-3xl font-bold bg-amber-200 text-amber-600 rounded-lg hover:bg-amber-300 hover:text-amber-800 transition-colors uppercase"
                        onClick={handleSubmit}
                    >
                        {formLoading ? (
                            <Spin className="h-7 w-7 fill-current" />
                        ) : (
                            <>
                                <Logo
                                    className=" w-auto h-8 mr-4"
                                    logoMinimal={true}
                                />
                                {t("newBattle")}
                            </>
                        )}
                    </button>
                </div>
                {message && (
                    <div className="mt-6">
                        <SimpleMessage title={message} />
                    </div>
                )}

                <div className="flex justify-center mt-20">
                    <a
                        href="https://www.producthunt.com/posts/warwordly?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-warwordly"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=330198&theme=light&period=daily"
                            width={250}
                            height={54}
                            alt="WarWordly - Play Wordle against a friend | Product Hunt"
                        />
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "home"])),
    },
});
