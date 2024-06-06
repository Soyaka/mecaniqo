import { Link, usePage } from "@inertiajs/inertia-react";
import { PageProps } from "@/types";
import { Separator } from "@/Components/ui/separator";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import React from "react";

type Page = {
    name: string;
    link: string;
    logo: JSX.Element;
    method?: string;
};

export default function ClientNavBar({ auth }: PageProps) {
    const [selectedLink, setSelectedLink] = React.useState<string>(
        window.location.pathname
    );
    const handleLinkClick = (link: string) => {
        // Handle link click here if needed
    };

    const Pages: Page[] = [
        {
            name: "Dashboard",
            link: "/dashboard",
            logo: <MdOutlineDashboard />,
            method: "get",
        },
        {
            name: "My Cars",
            link: "/cars",
            logo: <FaCarSide />,
            method: "get",
        },
        {
            name: "My Appointments",
            link: "/appointments",
            logo: <CgCalendarDates />,
            method: "get",
        },
        {
            name: "My Invoices",
            link: "/invoices",
            logo: <FaFileInvoiceDollar />,
            method: "get",
        },
    ];

    const Accounts: Page[] = [
        {
            name: "Profile",
            link: "/profile",
            logo: <CgProfile />,
            method: "get",
        },
        {
            name: "Settings",
            link: "/settings",
            logo: <IoSettingsOutline />,
            method: "get",
        },
        {
            name: "Logout",
            link: "/logout",
            logo: <TbLogout />,
            method: "post",
        },
    ];

    return (
        <div className="min-w-[18%] max-w-[18%] flex flex-col bg-[#215139] shadow-md border rounded-md">
            <div className="p-5 w-full flex items-center justify-center text-white">
                {auth.user.name}
            </div>
            <Separator className="bg-gray-600 m-2 w-[90%]" />
            <div className="flex flex-col">
                <h2 className="text-lg px-3 font-semibold text-gray-200">
                    Pages
                </h2>
                <div className="flex flex-col items-center p-2 gap-3 text-gray-100">
                    {Pages.map((page) => (
                        <Link
                            key={page.name}
                            href={page.link}
                            method={page.method}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                selectedLink=== page.link ? "bg-gray-900/20" : ""
                            }`}
                            onClick={() => handleLinkClick(page.link)}
                        >
                            <div className="w-2 h-2 rounded-full"></div>
                            <span className="flex gap-1 items-center justify-center hover:text-yellow-500">
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
                    {Accounts.map((account) => (
                        <Link
                            key={account.name}
                            href={account.link}
                            method={account.method}
                            className={`w-full cursor-pointer rounded flex items-center gap-1 p-2 ${
                                selectedLink === account.link ? "bg-gray-600/40" : ""
                            }`}
                            onClick={() => handleLinkClick(account.link)}
                        >
                            <div className="w-2 h-2 rounded-full"></div>
                            <span className="flex gap-1 items-center justify-center hover:text-red-500">
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
