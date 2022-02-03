const { i18n } = require("./next-i18next.config");
const languageAlternates = i18n.locales.map((locale) => ({
    hrefLang: locale === i18n.defaultLocale ? "x-default" : locale,
    href: `${process.env.NEXT_PUBLIC_SITE_URL}/${
        locale !== i18n.defaultLocale ? locale : ""
    }`,
}));

const title = "WarWordly";
const description = `Battle your friends on WarWordly`;

const SEO = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/og_image.png`,
                width: 1200,
                height: 630,
                alt: title,
            },
        ],
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        site_name: title,
    },
    twitter: {
        handle: "@WarWordly",
        site: "@WarWordly",
        cardType: "summary_large_image",
    },
    languageAlternates,
};

export default SEO;
