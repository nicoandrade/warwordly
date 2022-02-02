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
                url: `https://warwordly.com/og_image.png`,
                width: 1200,
                height: 630,
                alt: title,
            },
        ],
        type: "website",
        locale: "en_US",
        url: `https://warwordly.com`,
        site_name: title,
    },
    twitter: {
        handle: "@WarWordly",
        site: "@WarWordly",
        cardType: "summary_large_image",
    },
};

export default SEO;
