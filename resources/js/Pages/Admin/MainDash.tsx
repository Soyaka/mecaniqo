import React from "react";
import DashboradCard from "@/Components/DashboradCard";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUserClock } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import AdminTodayTasks from "./TodayTasks";
export default function AdminMainDash() {
    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
            <div className="flex "> 
            {cards.map((card, index) => (
                <DashboradCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    logo={card.logo}
                    color={card.color}
                />
            ))}
            </div>
            <AdminTodayTasks />
        </div>
    );
}

const cards = [
    {
        title: "Today's Money",
        logo: <RiMoneyDollarCircleLine  className="text-white"/>,
        value: "$0.00",
        color: "bg-green-500",
    },
    {
        title: "Today's Users",
        logo: <FaUserFriends  className="text-white"/>,
        value:  '0',
        color: "bg-blue-500",
    },
    {
        title: "New Clients",
        logo: <FaUserClock className="text-white" />,
        value: "500",
        color: "bg-red-500",
    },
    {
        title: "Done Tasks",
        logo: <MdDateRange className="text-white" />,
        value: "5",
        color: "bg-yellow-500",
    },
];
