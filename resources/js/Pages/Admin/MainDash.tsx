import React, { useEffect, useState } from "react";
import DashboradCard from "@/Components/DashboradCard";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUserClock } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import AdminTodayTasks from "./TodayTasks";

const cards = [
    {
        title: "Today's Money",
        logo: <RiMoneyDollarCircleLine className="text-white" />,
        value: "$0.00",
        color: "bg-green-500",
    },
    {
        title: "Today's Users",
        logo: <FaUserFriends className="text-white" />,
        value: "0",
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

export default function AdminMainDash() {
    const [repairRequests, setRepairRequests] = useState([]);

    useEffect(() => {
        fetchTodaysRepairRequests().then(data => {
            setRepairRequests(data.repair_requests);
        }).catch(error => {
            console.error('Error fetching repair requests:', error);
        });
    }, []);

    const fetchTodaysRepairRequests = async () => {
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute("content") : '';
        
            const headers = {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken || '',
            };
        
            const response = await fetch("/all-repair-requests", {
                method: "GET",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
           
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return { repair_requests: [] }; // Return empty array on error
        }
    };

    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
            <div className="flex">
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
            <AdminTodayTasks repair_requests={repairRequests} />
        </div>
    );
}
