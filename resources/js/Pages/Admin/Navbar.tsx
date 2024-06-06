import { useState } from "react";
import { Link } from "@inertiajs/react";
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

interface Page {
    name: string;
    logo: JSX.Element;
    href: string;
    current: boolean;
    method?: "get" | "post";
}

const Pages: Page[] = [
    {
        name: "Dashboard",
        logo: <LuLayoutDashboard />,
        href: "/dashboard",
        current: true,
    },
    {
        name: "Clients",
        logo: <FaUserGroup />,
        href: "/users",
        current: false,
    },
    {
        name: "Mechanics",
        logo: <FaUsersCog />,
        href: "/mechanics",
        current: false,
    },
    {
        name: "Admins",
        logo: <GrUserAdmin />,
        href: "/admins",
        current: false,
    },
    {
        name: "Operations",
        logo: <FaNetworkWired />,
        href: "/operations",
        current: false,
    },
];

const Accounts: Page[] = [
    {
        name: "Profile",
        logo: <CgProfile />,
        href: "/profile",
        current: true,
    },
    {
        name: "Sign out",
        logo: <LiaSignOutAltSolid />,
        href: "/logout",
        current: false,
        method: "post",
    },
    {
        name: "Settings",
        logo: <MdOutlineSettingsSuggest />,
        href: "/settings",
        current: false,
    },
];

export default function AdminNavbar(  {auth} : PageProps) {
    const [selectedLink, setSelectedLink] = useState<string>(
        window.location.pathname
    );

    const handleLinkClick = (link: string) => {
        setSelectedLink(link);
    };

    return (
        <div className="min-w-[18%] max-w-[18%]  2xl:w-1/5 flex flex-col bg-gray-800 shadow-md border rounded-md">
            <div className="p-5 w-full flex items-center justify-center text-white">
                {/* Place the site logo here */}
                {/* {auth.user.name } */}
                {auth.user.name}
            </div>
            <Separator className="bg-gray-600 m-2 w-[90%]" />
            <div className="flex flex-col">
                <h2 className="text-lg px-3 font-semibold text-gray-200">
                    Pages
                </h2>
                <div className="flex flex-col items-center p-2 gap-3 text-gray-100">
                    {/* Add links to the pages */}
                    {Pages.map((page) => (
                        <Link
                            key={page.name}
                            href={page.href}
                            method={page.method}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                page.href === selectedLink
                                    ? "bg-gray-900/50"
                                    : ""
                            }`}
                            onClick={() => handleLinkClick(page.href)}
                        >
                            <div className={`w-2 h-2 rounded-full`}></div>
                            <span className=" flex gap-1 items-center justify-center hover:text-blue-500">
                                {page.logo}
                                {page.name}
                            </span>
                        </Link>
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
                        <Link
                            key={account.name}
                            href={account.href}
                            method={account.method}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                account.href === selectedLink
                                    ? "bg-gray-900/50"
                                    : ""
                            }`}
                            onClick={() => handleLinkClick(account.href)}
                        >
                            <div className={`w-2 h-2 rounded-full`}></div>
                            <span className=" flex gap-1 items-center justify-center hover:text-blue-500">
                                {account.logo}
                                {account.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
