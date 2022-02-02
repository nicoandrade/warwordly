import "../styles/globals.css";

import Head from "next/head";

import { UserContextProvider } from "hooks/authUser";

import { DefaultSeo, LogoJsonLd } from "next-seo";
import SEO from "next-seo.config";

import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <PlausibleProvider
                domain={
                    "production" == process.env.NODE_ENV
                        ? process.env.NEXT_PUBLIC_SITE_URL.replace(
                              "https://",
                              ""
                          )
                        : ""
                }
            >
                <Head>
                    <meta
                        content="width=device-width, initial-scale=1"
                        name="viewport"
                    />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                </Head>

                <DefaultSeo {...SEO} />
                <LogoJsonLd
                    logo={`${process.env.NEXT_PUBLIC_SITE_URL}/avatar.png`}
                    url={process.env.NEXT_PUBLIC_SITE_URL}
                />
                <Component {...pageProps} />
            </PlausibleProvider>
        </UserContextProvider>
    );
}

export default MyApp;
