import React from "react";
import { Separator } from "@/Components/ui/separator";
import { OverViewProps } from "@/types";
export default function Statistics(  { auth, vehicles, invoices, repairs }: OverViewProps) {
    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
            <div className="flex h-[40%] gap-6">
                <MyVehicles />
                <MyInvoices />
            </div>
            <div className="w-full">
                <MyAppointments />
            </div>
        </div>
    );
}

export function MyInvoices() {
    return (
        <div className="w-[40%] p-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="text-lg font-light text-slate-600">My Invoices</h1>
            <Separator className="w-[90%] mx-3 my-2" />
        </div>
    );
}

export function MyVehicles() {
    return (
        <div className="w-[60%] p-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="text-lg font-light text-slate-600">My Vehicles</h1>
            <Separator className="w-[90%] mx-3 my-2" />
        </div>
    );
}

export function MyAppointments() {
    return (
        <div className="w-full min-h-full p-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="text-lg font-light text-slate-600">My Appointments</h1>
            <Separator className="w-[90%] mx-3 my-2" />
        </div>
    );
}
