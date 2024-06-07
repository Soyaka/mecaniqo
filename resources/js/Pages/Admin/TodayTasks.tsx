import React from "react";
import { Separator } from "@/Components/ui/separator";
import { SheetDemo } from "./SideSheet";
import { RepairRequest } from "@/types";

export default function AdminTodayTasks({ repair_requests } : { repair_requests: RepairRequest[] }) {
    console.log(repair_requests);
    if (!Array.isArray(repair_requests) || repair_requests.length === 0) {
        return (
            <div className="w-full h-full px-3 bg-white shadow-md rounded-lg overflow-y-scroll">
                <h1 className="fixed flex items-center h-6 p-6 z-20 bg-white 2xl:text-2xl font-semibold text-slate-600">
                    Today's Appointments
                </h1>
                <p>No appointments for today.</p>
            </div>
        );
    }
    return (
        <div className="w-full h-full px-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="fixed flex items-center h-6 p-6 z-20 bg-white 2xl:text-2xl font-semibold text-slate-600">
                Today's Appointments
            </h1>
            <div className="relative z-0 top-10 w-full flex flex-col gap-3 p-2">
                {repair_requests.map((repair_request) => (
                    <SheetDemo key={repair_request.id} RepReq={repair_request}>
                        <AppointRow {...repair_request} />
                    </SheetDemo>
                ))}
            </div>
        </div>
    );
}

const AppointRow = ({ id, user, description, status, date } : RepairRequest) => {
    const parsedDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsedDate);
    const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(parsedDate);

    return (
        <div className="w-full p-2 flex items-center justify-between">
            <div>
                <h1 className="text-gray-800 font-bold text-xl">{user?.name}</h1>
                <span className="text-gray-500 text-sm">{description}</span>
            </div>
            <div className="flex flex-row gap-4">
                <div>
                    {status === "pending" ? (
                        <span className="text-red-500 text-sm">Pending</span>
                    ) : status === "done" ? (
                        <span className="text-green-500 text-sm">Done</span>
                    ) : (
                        <span className="text-yellow-500 text-sm">In Progress</span>
                    )}
                </div>
                <div className="text-center">
                    <h1 className="text-gray-800 font-bold text-xl">{formattedTime}</h1>
                    <span className="text-gray-500 text-sm">{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};
