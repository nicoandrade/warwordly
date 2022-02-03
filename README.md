# Battle your friends in a word guessing game

[WarWordly](https://warwordly.com) is an Open Source and Free to Play multiplayer game inspired in the famous [Wordle](https://www.powerlanguage.co.uk/wordle/).
The idea is to play against an opponent to see who can guess the word first.

You can play in:

-   [English](https://warwordly.com)
-   [Español](https://warwordly.com/es)

![Promo](https://raw.githubusercontent.com/nicoandrade/warwordly/main/public/promo.png "Promo")

## ⭐️ Demo

Go to [WarWordly](https://warwordly.com)

## 📕 Rules of the Game

The rules of the game ar fairly easy, you have 6 guesses to guess the correct word before your opponent, each guess must be a valid word.
After submiting a word each letter will get a color:

-   ⬜️ Gray: the letter is incorrect
-   🟧 Orange: the letter is correct but in the wrong position
-   🟩 Green: the letter is correct and is in the correct position

---

## 💻 Development

This is a [Next.js](https://nextjs.org) app, so it is recommended to deploy it on [Vercel](https://vercel.com) but you can use any host that supports Next.js.
Also uses [Supabase](https://supabase.com) as Data Base. Supabase handles the realtime operations we need for the multiplayer part. Also handles all the Auth for the app.

### 💎 Cool stuff that uses

-   ▲ [Next.js](https://nextjs.org) as a React app
-   ▲ [Vercel](https://vercel.com/) for hosting
-   🔋 [Supabase](https://supabase.com) for DB, Auth & Realtime
-   🎨 [Tailwind](https://tailwindcss.com) for styling
-   💾 [SWR](https://swr.vercel.app) for data fetching
-   🌎 [next-i18next](https://github.com/isaachinman/next-i18next) translation to other languages
-   ✏️ [Heroicons](https://heroicons.com/) for icons
-   ⚡️ [tipybit](https://tipybit.com) for donations

### 🛠 Start Developing

First you need a new project on [Supabase](https://supabase.com), then use the schema in [database_schema.sql](database_schema.sql) to create all the necessary databases and policies.
Then grab [.env.local.example](.env.local.example) and rename it to `.env.local`. Inside this file you will have to add the keys from your Supabase project.

Once you did all that, install all dependencies with this command

```bash
npm install
```

After all dependencies are installed, you are ready to go, run this to start the app:

```bash
npm run dev
```

You will see the app running on [http://localhost:3000](http://localhost:3000)

---

### 👉 About the game

The game is developed in a way so most of the action happens in the front end, this means in the user's browser.
So is not that hard to cheat, but the idea of WarWordly is just to have fun and try cool technologies 😄.

There is a lot of thing we can do server side or even on the DB itself to make it harder to cheat, but that's not my goal with WarWordly.

#### 👏 Credits

This game is inspired in [Wordle](https://www.powerlanguage.co.uk/wordle/) and used some wonderful code from [hannahcode](https://github.com/hannahcode/word-guessing-game).

---

Created by [@NicoAndrade](https://nicoandrade.com)
