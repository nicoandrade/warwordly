import Link from "next/link";

import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";

import { useTranslation } from "next-i18next";

export default function Footer({ wide = "sm" }) {
    const { t } = useTranslation("common");

    const navigation = [
        {
            name: "Instagram",
            href: "https://www.instagram.com/warwordly",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "https://twitter.com/warwordly",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: "Github",
            href: "https://github.com/nicoandrade/warwordly",
            icon: (props) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="mt-10">
            <div
                className={`${
                    {
                        large: "max-w-5xl",
                        md: "max-w-2xl",
                        sm: "max-w-xl",
                    }[wide]
                } mx-auto pt-12 pb-6 px-4 sm:px-6 flex items-center justify-between lg:px-8`}
            >
                <div className="flex justify-center space-x-6 order-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <div className="mt-0 order-1">
                    <div className="text-left text-xs text-gray-400 flex items-center">
                        <Link href="/">
                            <a
                                aria-label="warwordly"
                                className="text-gray-400 hover:text-hero"
                            >
                                <Logo className="h-4 w-auto" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    {
                        large: "max-w-5xl",
                        md: "max-w-2xl",
                        sm: "max-w-xl",
                    }[wide]
                } mx-auto px-4 sm:px-6 lg:px-8`}
            >
                <div className="py-3 border-t border-black border-opacity-5 flex justify-between sm:items-center">
                    <div className="flex justify-center space-x-6 sm:order-2 text-xs">
                        <Link href="/privacy">
                            <a className="text-gray-500 hover:text-hero py-2 block">
                                {t("privacy")}
                            </a>
                        </Link>
                        <Link href="/about">
                            <a className="text-gray-500 hover:text-hero py-2 block">
                                {t("about")}
                            </a>
                        </Link>
                    </div>
                    <div className="sm:order-2">
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
}
