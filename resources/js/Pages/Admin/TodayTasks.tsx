import React from "react";
import { Separator } from "@/Components/ui/separator";
import { SheetDemo } from "./SideSheet";

export default function AdminTodayTasks() {
    return (
        <div className="w-full h-full px-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="fixed flex items-center h-6 p-6 z-20 bg-white 2xl:text-2xl font-semibold text-slate-600">
                Today's Appointments
            </h1>
            <div className="relative z-0 top-10 w-full flex flex-col gap-3 p-2">
                {TestApp.map((testApp) => (
                    <SheetDemo key={testApp.id} props={testApp}>
                        <AppointRow testApp={testApp} />
                    </SheetDemo>
                ))}
            </div>
        </div>
    );
}

const AppointRow = (props: any) => {
    const { testApp } = props;
    return (
        <div className="w-full p-2 flex items-center justify-between">
            <div>
                <h1 className="text-gray-800 font-bold text-xl">{testApp.name}</h1>
                <span className="text-gray-500 text-sm">{testApp.description}</span>
            </div>
            <div className="flex flex-row gap-4">
                <div>
                    {testApp.status === "pending" ? (
                        <span className="text-red-500 text-sm">Canceled</span>
                    ) : testApp.status === "done" ? (
                        <span className="text-green-500 text-sm">Done</span>
                    ) : (
                        <span className="text-yellow-500 text-sm">Pending</span>
                    )}
                </div>
                <div>
                    <h1 className="text-gray-800 font-bold text-xl">{testApp.time}</h1>
                    <span className="text-gray-500 text-sm">{testApp.date}</span>
                </div>
            </div>
        </div>
    );
};


const TestApp = [
    {
        id: 1,
        name: "Ahmed Ahmed",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description: "i need to change the oil on my car",
    },
    {
        id: 2,
        name: "Said Kaddour ",
        time: "10:30",
        date: "10-10-2022",
        status: "done",
        description: "my car has been repaired",
    },
    {
        id: 3,
        name: "Yassine Said",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description: "i need to change the air filter on my car",
    },
    {
        id: 4,
        name: "Fatih Ahmedi",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description: "my tairs have been damaged so i want to fix it",
    },
    {
        id: 5,
        name: "Salma Ahmed",
        time: "10:30",
        date: "10-10-2022",
        status: "cancelled",
        description: "i want to fix the wheel of my car and i need your help",
    },
    {
        id: 6,
        name: "Anas Benhalima",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description:
            "i noticed last time that my car was not repaired good so it starts from the beginning",
    },

    {
        id: 7,
        name: "Nora Gholami",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description: "my car stops i don't know why",
    },
    {
        id: 8,
        name: "Nora Gholami",
        time: "10:30",
        date: "10-10-2022",
        status: "pending",
        description: "my car stops i don't know why",
    },
];
