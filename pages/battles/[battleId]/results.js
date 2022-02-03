import { useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import Header from "components/Header";
import Footer from "components/Footer";

import ResultsColumnSkeleton from "components/results/ResultsColumnSkeleton";
import ShareBattle from "components/results/ShareBattle";

import ResultsColumn from "components/results/ResultsColumn";

import { useUser } from "hooks/authUser";

import { getGuessStatuses } from "libs/statuses";

import { fetchServerSideBattle } from "libs/fetch-server-side-data";

import { NextSeo } from "next-seo";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function BattleResults({ battle }) {
    const router = useRouter();

    // Gets the Battle ID from the URL
    const { battleId } = router.query;

    const { user, userDetails } = useUser();

    const { t } = useTranslation(["battle", "common"]);

    useEffect(() => {
        if (!battle) return;

        // If the Battle is not ended, we don't have any results to show
        if ("ended" !== battle.status) {
            router.push(`/battles/${battleId}`);
        }
    }, [battle, battleId, router]);

    const statuses1 =
        battle && battle.guesses1
            ? battle.guesses1.map((guess) =>
                  getGuessStatuses(guess, battle.solution)
              )
            : [];
    const statuses2 =
        battle && battle.guesses2
            ? battle.guesses2.map((guess) =>
                  getGuessStatuses(guess, battle.solution)
              )
            : [];

    // Get who won
    const winner = battle ? (battle.winner === battle.player1 ? 1 : 2) : null;

    // Get the player's names
    let p1Name = battle
        ? battle.user1.display_name
            ? battle.user1.display_name
            : battle.user1.username
            ? battle.user1.username
            : `${t("player")} 1`
        : `${t("player")} 1`;

    let p2Name = battle
        ? battle.user2.display_name
            ? battle.user2.display_name
            : battle.user2.username
            ? battle.user2.username
            : `${t("player")} 2`
        : `${t("player")} 2`;

    // Build the variable to pass to the Open Graph image
    let grid1 = statuses1.map((row) => row.map((cell) => cell.charAt(0)));
    if (battle && grid1.length < battle.amount_guesses) {
        grid1.push(
            ...[...Array(battle.amount_guesses - grid1.length)].map((row) =>
                [...Array(battle.amount_letters)].map((cell) => "e")
            )
        );
    }
    let grid2 = statuses2.map((row) => row.map((cell) => cell.charAt(0)));
    if (battle && grid2.length < battle.amount_guesses) {
        grid2.push(
            ...[...Array(battle.amount_guesses - grid2.length)].map((row) =>
                [...Array(battle.amount_letters)].map((cell) => "e")
            )
        );
    }

    // Create the Open Graph image URL
    let ogUrl = new URL(process.env.NEXT_PUBLIC_IMAGES_URL);
    ogUrl.pathname = "api/battle";
    if (battle) {
        ogUrl.searchParams.append("grid1", JSON.stringify(grid1));
        ogUrl.searchParams.append("grid2", JSON.stringify(grid2));
        ogUrl.searchParams.append("p1", p1Name);
        ogUrl.searchParams.append("p2", p2Name);
        ogUrl.searchParams.append("winner", winner);
    }

    const battleURL = `${process.env.NEXT_PUBLIC_SITE_URL}/battles/${battleId}/results`;

    return (
        <div>
            <NextSeo
                title={
                    router.isFallback
                        ? "Battle results - WarWordly"
                        : `Battle results - WarWordly`
                }
                description={
                    router.isFallback
                        ? "Battle results"
                        : `${p1Name} vs. ${p2Name}`
                }
                openGraph={{
                    title: router.isFallback
                        ? "Battle results - WarWordly"
                        : `Battle results - WarWordly`,
                    images: [
                        {
                            url: ogUrl,
                            width: 1200,
                            height: 630,
                            alt: "Battle results",
                        },
                    ],
                    site_name: "WarWordly",
                    url: battleURL,
                }}
            />

            <Header />

            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <h1 className="flex items-center text-2xl font-bold text-gray-600 mb-5">
                    {t("results")}
                </h1>

                {router.isFallback ? (
                    <div className="flex justify-center space-x-10">
                        <ResultsColumnSkeleton />
                        <ResultsColumnSkeleton />
                    </div>
                ) : (
                    <div className="flex justify-center space-x-10">
                        <ResultsColumn
                            statuses={statuses1}
                            amountLetters={battle ? battle.amount_letters : 5}
                            amountGuesses={battle ? battle.amount_guesses : 6}
                            name={
                                user && battle && user.id === battle.player1
                                    ? t("you")
                                    : p1Name
                            }
                            winner={
                                battle && battle.winner === battle.player1
                                    ? true
                                    : false
                            }
                        />
                        <ResultsColumn
                            statuses={statuses2}
                            amountLetters={battle ? battle.amount_letters : 5}
                            amountGuesses={battle ? battle.amount_guesses : 6}
                            name={
                                user && battle && user.id === battle.player2
                                    ? t("you")
                                    : p2Name
                            }
                            winner={
                                battle && battle.winner === battle.player2
                                    ? true
                                    : false
                            }
                        />
                    </div>
                )}
            </div>

            <ShareBattle battleId={battleId} imageURL={ogUrl} />

            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-center mt-12">
                <Link href="/">
                    <a className="btn w-full">
                        {t("newBattle", { ns: "common" })}
                    </a>
                </Link>
            </div>

            <Footer />
        </div>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    const paths = [];
    // We'll pre-render only these paths at build time.
    return { paths, fallback: true };
}

// This function gets called at build time
export async function getStaticProps({ params, locale }) {
    const { battleId } = params;

    // Fetch the data from the Data base.
    // This only runs on the server
    const battle = await fetchServerSideBattle(battleId);

    return {
        props: {
            battle,
            ...(await serverSideTranslations(locale, ["common", "battle"])),
        },
        revalidate: 600, // This page content will be updated every 600 sec (10 min)
    };
}
