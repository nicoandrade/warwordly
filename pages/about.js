import Footer from "components/Footer";
import Header from "components/Header";
import TipybitButton from "components/TipybitButton";

import { NextSeo } from "next-seo";

export default function Privacy() {
    return (
        <div>
            <NextSeo title="About the game - WarWordly" />

            <Header />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <article className="prose">
                    <h1>About the game</h1>
                    <p>
                        WarWordly is an Open Source and Free to Play multiplayer
                        game inspired in the famous Wordle. The idea is to play
                        against an opponent to see who can guess the word first.
                    </p>
                    <h2>Rules of the game</h2>
                    <p>
                        The rules of the game ar fairly easy, you have 6 guesses
                        to guess the correct word before your opponent, each
                        guess must be a valid word. After submiting a word each
                        letter will get a color:
                    </p>
                    <ul>
                        <li>⬜️ Gray: the letter is incorrect</li>
                        <li>
                            🟧 Orange: the letter is correct but in the wrong
                            position
                        </li>
                        <li>
                            🟩 Green: the letter is correct and is in the
                            correct position
                        </li>
                    </ul>
                    <h3>Open Source</h3>
                    <p>
                        The entire game is Open Source and you can have a look
                        at the{" "}
                        <a
                            href="https://github.com/nicoandrade/warwordly"
                            rel="noopener"
                            target="_blank"
                        >
                            Github Repo
                        </a>
                        .
                    </p>
                </article>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <p className="text-center mb-5 text-sm">
                        If you enjoy WarWordly
                    </p>
                    <div className="flex justify-center mb-5">
                        <TipybitButton />
                    </div>
                </div>
            </div>

            <Footer wide="md" />
        </div>
    );
}
