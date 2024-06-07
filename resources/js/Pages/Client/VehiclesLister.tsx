import React from "react";
import { Vehicle } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import ImageGallery from "./imagegalary";

export default function VehiclesLister({ vehicles }: { vehicles: Vehicle[] }) {
    console.log(vehicles);

    return (
        <div className="custom-scrollbar w-full h-[85%] overflow-y-scroll flex flex-col px-4 gap-6 justify-start rounded-md shadow-md bg-white border">
            <div className="sticky top-0 pt-3 flex flex-col z-10 bg-white">
                <h1 className="text-lg font-light text-slate-600">
                    My Vehicles
                </h1>
                <Separator className="w-[90%] mx-3 my-2" />
            </div>
            <div className=" grid grid-cols-3 2xl:grid-cols-4 gap-8">
                {vehicles.map((vehicle, index) => (
                    <div key={index} className="rounded-lg bordershadow-md cursor-pointer">
                        <ImageGallery images={vehicle.photos} />
                        <div className="flex gap-3 items-center p-2">
                            <h1 className="text-gray-800 font-bold">
                                {vehicle.brand}
                            </h1>
                            <span className="text-gray-500 text-sm">
                                {vehicle.model}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {vehicle.registration_number}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
