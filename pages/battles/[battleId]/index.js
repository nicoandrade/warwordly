import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import Header from "components/Header";
import Grid from "components/grid/Grid";
import Keyboard from "components/keyboard/Keyboard";
import Alert from "components/alerts/Alert";
import WinModal from "components/modals/WinModal";
import OpponentProgress from "components/opponent/OpponentProgress";
import Spin from "components/Spin";
import WaitingForOpponent from "components/battles/WaitingForOpponent";
import BattleSkeleton from "components/battles/BattleSkeleton";

import useBattle from "hooks/useBattle";

import { isWordInWordList } from "libs/words";
import { supabase } from "libs/initSupabase";

import {
    UserCircleIcon,
    DuplicateIcon,
    ClipboardCheckIcon,
} from "@heroicons/react/solid";

import { useUser } from "hooks/authUser";

export default function Battle() {
    const router = useRouter();

    // Gets the Battle ID from the URL
    const { battleId } = router.query;

    // We use SWR but as immutable and then update via mutate
    const { battle, battleLoading, battleError, battleMutate } = useBattle(
        battleId,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const { user, userDetails } = useUser();

    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    // This define if the current user is player #1 or #2 in the DB
    let playerNumber = null;
    let opponentNumber = null;
    if (user && battle) {
        if (user.id === battle.player2) {
            playerNumber = "2";
            opponentNumber = "1";
        } else {
            playerNumber = "1";
            opponentNumber = "2";
        }
    }

    const [updateBattleLoading, setUpdateBattleLoading] = useState(false);

    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);

    const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
    const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] =
        useState(false);
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);

    const [guesses, setGuesses] = useState([]);
    const [guessesOpponent, setGuessesOpponent] = useState([]);

    const onChar = (value) => {
        if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
            setCurrentGuess(`${currentGuess}${value}`);
        }
    };

    const onDelete = () => {
        setCurrentGuess(currentGuess.slice(0, -1));
    };

    const onEnter = async () => {
        if (!(currentGuess.length === 5) && !isGameLost) {
            setIsNotEnoughLetters(true);
            return setTimeout(() => {
                setIsNotEnoughLetters(false);
            }, 2000);
        }

        if (!isWordInWordList(currentGuess)) {
            setIsWordNotFoundAlertOpen(true);
            return setTimeout(() => {
                setIsWordNotFoundAlertOpen(false);
            }, 2000);
        }

        // Checks if the current word is the solution in the DB
        const winningWord = battle.solution === currentGuess;

        if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
            setUpdateBattleLoading(true);
            try {
                const guessesSlug = "guesses" + playerNumber;

                let dataToUpdate = {};

                dataToUpdate[guessesSlug] = [...guesses, currentGuess];

                // Updates the Battle data in the DB
                const { data, error } = await supabase
                    .from("battles")
                    .update(dataToUpdate)
                    .eq("id", battleId)
                    .single();

                if (error) throw error;
                console.log(data);

                battleMutate(data);
            } catch (error) {
                console.log(error);

                // setResponseMessage({
                //     messageShow: true,
                //     messageType: "error",
                //     messageTitle: error.error_description || error.message,
                // });
            } finally {
                setUpdateBattleLoading(false);
            }

            setGuesses([...guesses, currentGuess]);
            setCurrentGuess("");

            // If the current word is the winner, updates the current user as winner in the DB
            if (winningWord) {
                try {
                    let dataToUpdate = { winner: user.id, status: "ended" };

                    // Updates the Battle data in the DB
                    const { data, error } = await supabase
                        .from("battles")
                        .update(dataToUpdate)
                        .eq("id", battleId)
                        .single();

                    if (error) throw error;

                    // Updates the complete data to SWR
                    battleMutate(data);
                } catch (error) {
                    console.log(error);
                }
            }

            // If the user maxed out the guesses, game over.
            if (guesses.length === 5) {
                setIsGameWon(false);
                setIsWinModalOpen(true);
            }
        }
    };

    useEffect(async () => {
        if (false === user && battleId) {
            router.push(
                `/login?redirectTo=${`${process.env.NEXT_PUBLIC_SITE_URL}/battles/${battleId}`}`
            );
        }

        if (!battle || null === user) return false;

        const playerGuesses = "guesses" + playerNumber;
        const opponentGuesses = "guesses" + opponentNumber;

        // Update the arrays with the guesses for each player
        if (battle[playerGuesses] !== guesses) {
            setGuesses(battle[playerGuesses] || []);
            setGuessesOpponent(battle[opponentGuesses] || []);
        }

        // If the Battle has a winner, show the modal
        if (battle.winner) {
            if (user.id === battle.winner) {
                setIsGameWon(true);
            } else {
                setIsGameWon(false);
            }
            setIsWinModalOpen(true);
        }

        // If we are waiting for an opponent and the current user is not the player 1,
        // add current user as player 2
        if (
            "pending" === battle.status &&
            !battle.player2 &&
            user.id !== battle.player1
        ) {
            try {
                let dataToUpdate = { player2: user.id, status: "started" };

                // Updates the Battle data in the DB
                const { data, error } = await supabase
                    .from("battles")
                    .update(dataToUpdate)
                    .eq("id", battleId)
                    .single();

                if (error) throw error;

                // Updates the complete data to SWR
                battleMutate(data);
            } catch (error) {
                console.log(error);
            }
        }
    }, [battle, user]);

    // Realtime Battle
    useEffect(() => {
        if (!battleId) return;

        // Subscribe to the Battle
        const battleSubscription = supabase
            .from(`battles:id=eq.${battleId}`)
            .on("UPDATE", (payload) => {
                // Updates all the data from the Battle to SWR
                battleMutate(payload.new);
            })
            .subscribe();

        // Cleanup on unmount
        return () => {
            battleSubscription.unsubscribe();
        };
    }, [battleId]);

    return (
        <div>
            <Header />

            {battleLoading && <BattleSkeleton />}

            {battle &&
                user &&
                user.id === battle.player1 &&
                !battle.player2 && <WaitingForOpponent battleId={battleId} />}

            {battle && user && battle.player1 && battle.player2 && (
                <>
                    <div className="flex justify-center mx-auto w-full">
                        <div className="mt-10 sm:mt-12 mx-2 sm:mx-4">
                            <Grid
                                guesses={guesses}
                                currentGuess={currentGuess}
                                loading={battleLoading}
                                solution={battle?.solution || ""}
                            />
                        </div>
                        <div className="">
                            <div className="h-10 sm:h-12 flex flex-wrap justify-center items-center w-full">
                                <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
                                <span className="block w-full text-center text-xs">
                                    Opponent
                                </span>
                            </div>
                            <OpponentProgress
                                guesses={guessesOpponent}
                                loading={battleLoading}
                                solution={battle?.solution || ""}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center my-3">
                        {updateBattleLoading ? (
                            <Spin className="h-5 w-5 text-gray-400" />
                        ) : (
                            <span className="h-5 w-5 block" />
                        )}
                    </div>

                    <Keyboard
                        onChar={onChar}
                        onDelete={onDelete}
                        onEnter={onEnter}
                        guesses={guesses}
                    />
                    <WinModal
                        isOpen={isWinModalOpen}
                        setIsOpen={setIsWinModalOpen}
                        variant={isGameWon ? "win" : "lost"}
                        solution={battle?.solution}
                    />

                    <Alert
                        message="Not enough letters"
                        isOpen={isNotEnoughLetters}
                        setIsOpen={setIsNotEnoughLetters}
                    />
                    <Alert
                        message="Word not found"
                        isOpen={isWordNotFoundAlertOpen}
                        setIsOpen={setIsWordNotFoundAlertOpen}
                    />
                </>
            )}
        </div>
    );
}
