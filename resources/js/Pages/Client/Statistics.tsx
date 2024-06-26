import React from "react";
import { Separator } from "@/Components/ui/separator";
import { OverViewProps, Vehicle } from "@/types";

export default function Statistics({
    auth,
    vehicles,
    invoices,
    repairs,
}: OverViewProps) {
    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
            <div className="flex h-[40%] gap-6">
                <MyVehicles vehicles={vehicles} />
                <MyInvoices />
            </div>
            <div className="w-full">
                <MyAppointments />
            </div>
        </div>
    );
}

export function MyVehicles({ vehicles }: { vehicles: Vehicle[] }) {
    return (
        <div className=" custom-scrollbar w-[40%]  bg-white shadow-md rounded-lg overflow-y-scroll">
            <div className="fixed  flex  flex-col items-center  z-10 bg-white">
                <h1 className=" w-96 mt-2 ml-3 text-lg font-light text-slate-600">
                    My Vehicles
                </h1>
                <Separator className="w-[90%] mx-3 my-2" />
            </div>
            <div className="relative top-12 flex flex-col gap-4  p-3 rounded border-green-900">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="flex flex-row items-center gap-4"
                    >
                        <img
                            src={`storage/${vehicle.photos[0].replace(
                                "public/",
                                ""
                            )}`}
                            className="w-12 h-12 rounded-lg bg-cover "
                        />
                        <h1 className="text-gray-800 font-bold">
                            {vehicle.brand}
                        </h1>
                        <div className="flex flex-row gap-4 items-center">
                            <span className="text-gray-500 text-sm">
                                {vehicle.model}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {vehicle.registration_number}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {vehicle.fuel_type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MyInvoices() {
    return (
        <div className=" custom-scrollbar w-[60%] p-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="text-lg font-light text-slate-600">My Invoices</h1>
            <Separator className="w-[90%] mx-3 my-2" />
        </div>
    );
}

export function MyAppointments() {
    return (
        <div className=" custom-scrollbar w-full min-h-full p-3 bg-white shadow-md rounded-lg overflow-y-scroll">
            <h1 className="text-lg font-light text-slate-600">
                My Appointments
            </h1>
            <Separator className="w-[90%] mx-3 my-2" />
        </div>
    );
}
