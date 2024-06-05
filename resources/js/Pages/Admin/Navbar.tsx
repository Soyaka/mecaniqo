import React from "react";
import { PageProps } from "@/types";
import { Separator } from "@/Components/ui/separator";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FaNetworkWired } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdOutlineSettingsSuggest } from "react-icons/md";

import { log } from "console";

const Pages = [
    {
        name: "Dashboard",
        logo: <LuLayoutDashboard />,
        href: "/dashboard",
        current: true,
    },
    {
        name: "Clients",
        logo: <FaUserGroup />,
        href: "/clients",
        current: false,
    },
    {
        name: "Mechanics",
        logo: <FaUsersCog />,
        href: "/mechanics",
        current: false,
    },
    { name: "Admins", logo: <GrUserAdmin />, href: "/admins", current: false },
    {
        name: "Operations",
        logo: <FaNetworkWired />,
        href: "/operations",
        current: false,
    },
];

const Accounts = [
    { name: "Profile", logo: <CgProfile />, href: "/profile", current: true },
    {
        name: "Sign out",
        logo: <LiaSignOutAltSolid />,
        href: "/signout",
        current: false,
    },
    {
        name: "Settings",
        logo: <MdOutlineSettingsSuggest />,
        href: "/settings",
        current: false,
    },
];

export default function AdminNavbar({ auth }: PageProps) {
    const CurrentLocation = window.location.pathname;
    console.log(CurrentLocation);

    return (
        <div className="w-1/4 2xl:w-1/5 flex flex-col bg-gray-800 shadow-md border rounded-md">
            <div className="p-5 w-full flex items-center justify-center">
                {/* Place the site logo here */}
                Dashboard
            </div>
            <Separator className="bg-gray-600 m-2 w-[90%]" />
            <div className="flex flex-col">
                <h2 className="text-lg px-3 font-semibold text-gray-200">
                    Pages
                </h2>
                <div className="flex flex-col items-center p-2 gap-3 text-gray-100">
                    {/* Add links to the accounts */}
                    {Pages.map((page) => (
                        <div
                            key={page.name}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                page.href === CurrentLocation
                                    ? "bg-gray-900/50"
                                    : ""
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full`}></div>
                            <span className=" flex gap-1 items-center justify-center hover:text-blue-500">
                                {page.logo}
                                {page.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <Separator className="bg-gray-600 m-2 w-[90%]" />
            <div className="flex flex-col">
                <h2 className="text-lg px-3 font-semibold text-gray-200">
                    Account
                </h2>
                <div className="flex flex-col items-center p-2 gap-3 text-gray-100">
                    {/* Add links to the accounts */}
                    {Accounts.map((account) => (
                        <div
                            key={account.name}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                account.href === CurrentLocation
                                    ? "bg-gray-900/50"
                                    : ""
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full`}></div>
                            <span className=" flex gap-1 items-center justify-center hover:text-blue-500">
                                {account.logo}
                                {account.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
