const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"],
        reloadOnPrerender:
            "development" === process.env.NODE_ENV ? true : false,
        localePath: path.resolve("./public/locales"), // this is because Vercel has some issues locating the folder on server side
    },
};
