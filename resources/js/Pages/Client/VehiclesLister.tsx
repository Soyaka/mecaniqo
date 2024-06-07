import React from "react";
import { Vehicle } from "@/types";
import { Separator } from "@radix-ui/react-separator";
export default function VehiclesLister({ vehicles }: { vehicles: Vehicle[] }) {
    console.log(vehicles);
    return (
        <div className="custom-scrollbar w-full h-[95%] overflow-y-scroll flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-white border">
            <div className="sticky top-2  flex  flex-col  z-10 bg-white">
                <h1 className="text-lg font-light text-slate-600">
                    My Vehicles
                </h1>
                <Separator className="w-[90%] mx-3 my-2" />
            </div>
            <div className="w-full flex flex-col gap-4">
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
                        alt={`${vehicle.brand} photo`}
                        className="w-12 h-12 rounded-lg"
                    />
                    <h1 className="text-gray-800 font-bold">{vehicle.brand}</h1>
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
