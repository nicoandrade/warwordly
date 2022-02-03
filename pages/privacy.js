import Footer from "components/Footer";
import Header from "components/Header";

import { NextSeo } from "next-seo";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Privacy() {
    return (
        <div>
            <NextSeo title="Privacy Policy - WarWordly" />

            <Header />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <article className="prose">
                    <h1 className=" font-black">Privacy Policy</h1>
                    <p>
                        This Privacy Policy describes how your personal
                        information is collected, used, and shared when you
                        visit or make a purchase from warwordly.com (the
                        “Site”).
                    </p>

                    <h2>Information We Collect</h2>
                    <p>
                        We don’t use cookies, we don’t generate any persistent
                        identifiers and we don’t collect or store any personal
                        or identifiable data. All of the data is aggregated data
                        only and it has no personal information.
                    </p>
                    <p>
                        By using the Site, all the site measurement is carried
                        out absolutely anonymously. We measure only the most
                        essential data points and nothing else. All the metrics
                        we do collect fit on one single page. Here is the
                        complete list of what we collect and store about your
                        website visitors:
                    </p>
                    <ul>
                        <li>Page URL</li>
                        <li>HTTP Referer</li>
                        <li>Browser</li>
                        <li>Operating system</li>
                        <li>Device type</li>
                        <li>Visitor Country</li>
                    </ul>
                    <p>
                        The privacy of our website visitors is important to us
                        so we do not track any individual people. As a visitor
                        to the Site:
                    </p>
                    <ul>
                        <li>No personal information is collected</li>
                        <li>
                            No information such as cookies is stored in the
                            browser
                        </li>
                        <li>
                            No information is shared with, sent to or sold to
                            third-parties
                        </li>
                        <li>
                            No information is shared with advertising companies
                        </li>
                        <li>
                            No information is mined and harvested for personal
                            and behavioral trends
                        </li>
                        <li>No information is monetized</li>
                    </ul>

                    <h2>As a user of WarWordly</h2>

                    <p>
                        Our guiding principle is to collect only what we need
                        and that we will solely process this information to
                        provide you with the service you signed up for.
                    </p>
                    <p>
                        We use a select number of trusted external service
                        providers for certain service offerings. These service
                        providers are carefully selected and meet high data
                        protection, data privacy and security standards.
                    </p>
                    <p>
                        We only share information with them that is required for
                        the services offered and we contractually bind them to
                        keep any information we share with them as confidential
                        and to process personal data only according to our
                        instructions.
                    </p>
                    <p>Here’s what that means in practice:</p>

                    <h3>What we collect and what we use it for</h3>
                    <ul>
                        <li>
                            <strong>
                                An email address is required to create an
                                account.
                            </strong>{" "}
                            You need to provide us with your email address if
                            you want to create a WarWordly account. That’s just
                            so you can log in and personalize your new account,
                            and we can send you updates or other essential
                            information.
                        </li>
                        <li>
                            <strong>
                                A persistent first-party cookie is stored to
                                remember you’re logged in.
                            </strong>{" "}
                            If you log in to your WarWordly account, you give us
                            permission to use cookies so you don’t have to log
                            in on each returning session. This makes it easier
                            for you to use our product. A cookie is a piece of
                            text stored by your browser. You can adjust cookie
                            retention settings in your own browser. Cookies that
                            are already stored may be deleted at any time.
                        </li>

                        <li>
                            <strong>
                                All emails are sent using a third-party email
                                provider.
                            </strong>{" "}
                            Transactional emails and email reports (should you
                            choose to subscribe to them) are sent using Mailgun.
                            We have disabled both open tracking and link
                            tracking on all emails sent. See the{" "}
                            <a
                                href="https://www.mailgun.com/privacy-policy/"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Mailgun Privacy Policy
                            </a>{" "}
                            for full details.
                        </li>
                        <li>
                            <strong>
                                All analytics are handled by a third-party
                                analytics provider.
                            </strong>{" "}
                            The Site analytics are handled by Plausible.
                            Plausible is a privacy focused service. See the{" "}
                            <a
                                href="https://plausible.io/privacy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Plausible Privacy Policy
                            </a>{" "}
                            for full details.
                        </li>
                    </ul>

                    <h2>Retention of data</h2>
                    <p>
                        We will retain your information as long as your account
                        is active, as necessary to provide you with the services
                        or as otherwise set forth in this policy.
                    </p>
                    <p>
                        We will also retain and use this information as
                        necessary for the purposes set out in this policy and to
                        the extent necessary to comply with our legal
                        obligations, resolve disputes, enforce our agreements
                        and protect WarWordly’s legal rights.
                    </p>

                    <h2>Changes and questions</h2>
                    <p>
                        We may update this policy as needed to comply with
                        relevant regulations and reflect any new practices.
                        Whenever we make a significant change to our policies,
                        we will also announce them on our company blog or social
                        media profiles.
                    </p>
                    <p>
                        Contact us if you have any questions, comments, or
                        concerns about this privacy policy, your data, or your
                        rights with respect to your information.
                    </p>

                    <p>Last updated: January 2nd, 2022</p>
                </article>
            </div>

            <Footer wide="md" />
        </div>
    );
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});
