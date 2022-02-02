import { useEffect } from "react";

import { useRouter } from "next/router";

import Header from "components/Header";
import ResultsColumnSkeleton from "components/results/ResultsColumnSkeleton";

import ResultsColumn from "components/results/ResultsColumn";

import useBattle from "hooks/useBattle";

import { isWordInWordList } from "libs/words";
import { supabase } from "libs/initSupabase";

import { useUser } from "hooks/authUser";

import { getGuessStatuses } from "libs/statuses";

import { fetchServerSideBattle } from "libs/fetch-server-side-data";

import { NextSeo } from "next-seo";

export default function BattleResults({ battle }) {
    const router = useRouter();

    // Gets the Battle ID from the URL
    const { battleId } = router.query;

    const { user, userDetails } = useUser();

    useEffect(() => {
        if (!battle) return;

        // If the Battle is not ended, we don't have any results to show
        if ("ended" !== battle.status) {
            router.push(`/battles/${battleId}`);
        }
    }, [battle, battleId, router]);

    const statuses1 = battle
        ? battle.guesses1.map((guess) =>
              getGuessStatuses(guess, battle.solution)
          )
        : [];
    const statuses2 = battle
        ? battle.guesses2.map((guess) =>
              getGuessStatuses(guess, battle.solution)
          )
        : [];

    return (
        <div>
            <NextSeo
                title={
                    router.isFallback
                        ? "Loading results... - WarWordly"
                        : "Results - WarWordly"
                }
            />

            <Header />

            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <h1 className="flex items-center text-2xl font-bold text-gray-600 mb-5">
                    Results
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
                            name={"Player 1"}
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
                            name={"Player 2"}
                            winner={
                                battle && battle.winner === battle.player2
                                    ? true
                                    : false
                            }
                        />
                    </div>
                )}
            </div>
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
export async function getStaticProps({ params }) {
    const { battleId } = params;

    // Fetch the data from the Data base.
    // This only runs on the server
    const battle = await fetchServerSideBattle(battleId);

    return {
        props: { battle },
        revalidate: 1200, // This page content will be updated every 1200 sec (20 min)
    };
}
