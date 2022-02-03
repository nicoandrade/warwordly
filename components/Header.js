import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import Image from "next/image";

import { useUser } from "hooks/authUser";

import Logo from "./Logo";
import { useTranslation } from "next-i18next";

const NextLink = ({ href, children, ...rest }) => (
    <Link href={href}>
        <a {...rest}>{children}</a>
    </Link>
);

export default function Header({ logoMinimal = false }) {
    const { user, signOut, userDetails } = useUser();
    const { t } = useTranslation("common");

    return (
        <header className="mb-6">
            <nav
                className="w-full mx-auto px-4 sm:px-6 lg:px-8"
                aria-label="Top"
            >
                <div className="w-full py-6 flex items-center justify-between relative">
                    <div className="flex items-center">
                        <Link href="/">
                            <a>
                                <span className="sr-only">WarWordly</span>
                                <Logo
                                    className="h-5 sm:h-6 w-auto fill-current text-gray-400 hover:text-hero"
                                    logoMinimal={logoMinimal}
                                />
                            </a>
                        </Link>
                    </div>

                    {user ? (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-black bg-opacity-5 p-1 flex items-center text-sm rounded-full focus:outline-none focus:ring-2  focus:ring-blue-600 group">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>

                                        {userDetails ? (
                                            userDetails.image ? (
                                                <div className="w-7 h-7 inline-flex items-center bg-gray-100 justify-center rounded-full overflow-hidden relative flex-shrink-0">
                                                    <Image
                                                        src={userDetails.image}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt={
                                                            userDetails.display_name
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-7 h-7 inline-flex items-center justify-center bg-gray-100 rounded-full text-sm text-center text-gray-400  font-bold uppercase">
                                                    {userDetails &&
                                                        userDetails.display_name &&
                                                        userDetails.display_name
                                                            .split(" ")[0]
                                                            .charAt(0) +
                                                            (userDetails.display_name.split(
                                                                " "
                                                            ).length > 1
                                                                ? userDetails.display_name
                                                                      .split(
                                                                          " "
                                                                      )[1]
                                                                      .charAt(0)
                                                                : userDetails.display_name
                                                                      .split(
                                                                          " "
                                                                      )[0]
                                                                      .charAt(
                                                                          1
                                                                      ))}
                                                </div>
                                            )
                                        ) : (
                                            <div className="w-7 h-7 inline-flex bg-gray-200 rounded-full loading-dark"></div>
                                        )}

                                        <span className="mr-4 ml-3 truncate text-sm text-center w-24 md:w-auto py-1 group-hover:text-gray-600 hidden sm:flex">
                                            {userDetails &&
                                            userDetails.display_name
                                                ? userDetails.display_name
                                                : user.email}
                                        </span>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg p-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {/* <Menu.Item>
                                            {({ active }) => (
                                                <NextLink
                                                    href="/admin/profile"
                                                    className={`
                                            ${active ? "bg-gray-100" : ""}
                                            flex px-4 py-2 text-sm text-gray-600 rounded-lg
                                        `}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="h-5 w-5 mr-3 text-gray-500 fill-current"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12 10a4 4 0 100-8 4 4 0 000 8zm-3.2 4A4.8 4.8 0 004 18.8 3.2 3.2 0 007.2 22h9.6a3.2 3.2 0 003.2-3.2 4.8 4.8 0 00-4.8-4.8H8.8z"
                                                            opacity=".12"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.75 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm-3.2 12a5.55 5.55 0 00-5.55 5.55 3.95 3.95 0 003.95 3.95h9.6a3.95 3.95 0 003.95-3.95 5.55 5.55 0 00-5.55-5.55H8.8zM4.75 18.8a4.05 4.05 0 014.05-4.05h6.4a4.05 4.05 0 014.05 4.05 2.45 2.45 0 01-2.45 2.45H7.2a2.45 2.45 0 01-2.45-2.45z"
                                                        />
                                                    </svg>
                                                    Profile
                                                </NextLink>
                                            )}
                                        </Menu.Item> */}

                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`
                                                            ${
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : ""
                                                            }
                                                            flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg
                                                        `}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        signOut();
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="h-5 w-5 mr-3 text-gray-500 fill-current"
                                                    >
                                                        <rect
                                                            width="12"
                                                            height="20"
                                                            x="2"
                                                            y="2"
                                                            opacity=".12"
                                                            rx="4"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.5 2.75c1.45 0 2.009.009 2.443.14a3.25 3.25 0 012.167 2.167c.132.435.14.993.14 2.443V8a.75.75 0 001.5 0v-.643c0-1.258 0-2.06-.204-2.735a4.75 4.75 0 00-3.167-3.167C10.703 1.25 9.9 1.25 8.644 1.25h-.671c-.909 0-1.63 0-2.213.04-.596.04-1.103.125-1.578.321a4.75 4.75 0 00-2.57 2.57c-.197.475-.281.983-.322 1.579-.04.583-.04 1.303-.04 2.212v8.055c0 .909 0 1.629.04 2.212.04.596.125 1.104.322 1.578a4.75 4.75 0 002.57 2.571c.475.196.982.281 1.578.322.584.04 1.304.04 2.213.04h.67c1.258 0 2.06 0 2.736-.205a4.75 4.75 0 003.166-3.166c.206-.676.205-1.478.205-2.737V16a.75.75 0 00-1.5 0v.5H14h-.75c0 1.45-.008 2.01-.14 2.444a3.25 3.25 0 01-2.166 2.166c-.435.132-.994.14-2.444.14H8c-.942 0-1.611 0-2.137-.036-.52-.035-.846-.103-1.107-.21a3.25 3.25 0 01-1.759-1.76c-.108-.26-.175-.586-.21-1.106-.036-.526-.037-1.195-.037-2.137V8c0-.943 0-1.612.036-2.138.036-.52.103-.845.212-1.106a3.25 3.25 0 011.758-1.76c.261-.107.587-.175 1.107-.21C6.389 2.75 7.058 2.75 8 2.75h.5zm10.03 4.72a.75.75 0 00-1.06 1.06l2.72 2.72H9a.75.75 0 000 1.5h11.19l-2.72 2.72a.75.75 0 001.06 1.06l4-4a.75.75 0 000-1.06l-4-4z"
                                                        />
                                                    </svg>
                                                    {t("signOut")}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    ) : (
                        <div className="ml-10 space-x-8">
                            <Link href="/login">
                                <a className="btn bg-transparent hover:bg-gray-100">
                                    {t("signIn")}
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
