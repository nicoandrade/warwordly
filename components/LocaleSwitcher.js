import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import { GlobeIcon } from "@heroicons/react/solid";

export default function LocaleSwitcher() {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;

    const { t } = useTranslation("common");

    return (
        <div className="relative">
            <label htmlFor="locale" className="sr-only">
                Language
            </label>
            <select
                id="locale"
                name="locale"
                className="py-1 pl-9 text-sm border uppercase hover:border-gray-500 transition-colors"
                defaultValue={activeLocale}
                onChange={(e) => {
                    const { pathname, asPath, query } = router;
                    // change just the locale and maintain all other route information including href's query
                    router.push({ pathname, query }, asPath, {
                        locale: e.target.value,
                    });
                }}
            >
                {locales.map((locale) => (
                    <option>{locale}</option>
                ))}
            </select>
            <GlobeIcon className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
        </div>
    );
}
